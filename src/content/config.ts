import { defineCollection, z } from 'astro:content';

/**
 * 四态内容池 Schema 定义
 * 
 * 设计哲学：
 * - Posts: 深度长文，承载知识体系，支持双向链接、目录与系列
 * - Memos: 碎片思考，去结构化，支持时间轴渲染与情绪标签
 * - Projects: 工程沉淀，强调技术栈、状态流转与可视化展示
 * - Now: 当下同步，极简广播，记录此刻的输入/产出/状态
 */

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100),
      description: z.string().max(200),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      cover: image().optional(),
      category: z.enum(['essay', 'tech', 'design', 'philosophy']),
      tags: z.array(z.string()).max(5).default([]),
      series: z.string().optional(),
      relatedPosts: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      toc: z.boolean().default(true),
    }),
});

const memos = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      pubDate: z.date(),
      mood: z.string().optional(),
      tags: z.array(z.string()).default([]),
      images: z.array(image()).max(4).optional(),
    }),
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(300),
      thumbnail: image().optional(),
      techStack: z.array(z.string()),
      link: z.string().url().optional(),
      github: z.string().url().optional(),
      featured: z.boolean().default(false),
      startDate: z.date(),
      endDate: z.date().optional(),
      status: z.enum(['active', 'archived', 'wip']).default('active'),
    }),
});

const now = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    // 状态类型：input(摄入) / output(产出) / thinking(思考) / resting(休憩)
    status: z.enum(['input', 'output', 'thinking', 'resting']),
    mood: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // 关联的项目 slug
    projects: z.array(z.string()).default([]),
    // 能量值 1-10
    energy: z.number().min(1).max(10).optional(),
  }),
});

export const collections = { posts, memos, projects, now };
