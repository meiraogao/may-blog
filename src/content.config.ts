import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		category: z.enum(['技术', 'AI', '产品', '投资', '读书', '随笔', '项目记录', '生活']),
		tags: z.array(z.string()).default([]),
		pinned: z.boolean().default(false),
		cover: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		type: z.enum(['开源项目', '个人项目', '小工具', 'AI 产品设计案例']),
		status: z.string(),
		techStack: z.array(z.string()).default([]),
		link: z.string().optional(),
		image: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

const books = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/books' }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		date: z.coerce.date(),
		status: z.enum(['想读', '在读', '已读']),
		noteUrl: z.string().optional(),
		cover: z.string().optional(),
		featured: z.boolean().default(false),
		description: z.string().optional(),
	}),
});

export const collections = { posts, projects, books };
