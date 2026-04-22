import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const fontPath = path.resolve(process.cwd(), 'public/fonts/lxgwwenkai-regular.ttf');

export const GET: APIRoute = async ({ props }) => {
  const post = props.post;
  if (!post) return new Response(null, { status: 404 });

  const fontData = fs.readFileSync(fontPath);

  const title = post.data.title;
  const description =
    post.data.description.length > 80
      ? post.data.description.slice(0, 80) + '...'
      : post.data.description;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FCFAF7',
          padding: 80,
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                width: 60,
                height: 4,
                backgroundColor: '#065F46',
                borderRadius: 2,
                marginBottom: 48,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 56,
                color: '#2C2C2C',
                fontFamily: 'LXGW WenKai',
                lineHeight: 1.3,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 28,
                color: '#8B8680',
                marginTop: 32,
                lineHeight: 1.5,
                fontFamily: 'LXGW WenKai',
              },
              children: description,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#065F46',
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 22,
                      color: '#B0ABA5',
                      fontFamily: 'LXGW WenKai',
                      letterSpacing: '0.05em',
                    },
                    children: '思考室',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'LXGW WenKai',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();

  return new Response(pngData.asPng(), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({ 
    params: { slug: post.slug },
    props: { post: { data: post.data } },
  }));
}
