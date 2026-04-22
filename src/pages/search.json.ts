import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const memos = await getCollection('memos');
  const projects = await getCollection('projects');

  const index = {
    posts: posts.map(p => ({
      type: 'post' as const,
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
      content: p.body?.slice(0, 600),
      category: p.data.category,
      tags: p.data.tags,
    })),
    memos: memos.map(m => ({
      type: 'memo' as const,
      slug: m.slug,
      title: m.body?.slice(0, 60).replace(/\n/g, ' ') || '碎念',
      content: m.body,
      tags: m.data.tags,
      mood: m.data.mood,
    })),
    projects: projects.map(p => ({
      type: 'project' as const,
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
      techStack: p.data.techStack,
      status: p.data.status,
    })),
  };

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
