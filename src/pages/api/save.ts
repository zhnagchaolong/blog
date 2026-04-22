import type { APIRoute } from 'astro';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

export const GET: APIRoute = () => {
  return new Response('ok', { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  // 仅在开发模式下可用
  if (import.meta.env.PROD) {
    return new Response(JSON.stringify({ error: '仅开发模式可用' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { path: filePath, content } = body;

    if (!filePath || typeof content !== 'string') {
      return new Response(JSON.stringify({ error: '缺少 path 或 content' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 安全检查：只允许写入 src/ 目录，禁止目录遍历
    const normalized = filePath.replace(/\\/g, '/');
    if (normalized.includes('..') || !normalized.startsWith('src/')) {
      return new Response(JSON.stringify({ error: '路径不合法' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const absolutePath = resolve(process.cwd(), normalized);
    const dir = dirname(absolutePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(absolutePath, content, 'utf-8');

    return new Response(JSON.stringify({ success: true, path: normalized }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
