import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Project = CollectionEntry<'projects'>;
export type Book = CollectionEntry<'books'>;

export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(date);

export const sortByDateDesc = <T extends { data: { date: Date } }>(items: T[]) =>
	[...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const getPublishedPosts = async () => {
	const posts = await getCollection('posts', ({ data }) => !data.draft);
	return sortByDateDesc(posts);
};

export const getAllProjects = async () => {
	const projects = await getCollection('projects');
	return sortByDateDesc(projects);
};

export const getAllBooks = async () => {
	const books = await getCollection('books');
	return sortByDateDesc(books);
};

export const getReadingTime = (body = '') => {
	const words = body
		.replace(/```[\s\S]*?```/g, '')
		.replace(/<[^>]+>/g, '')
		.trim().length;
	const minutes = Math.max(1, Math.ceil(words / 500));
	return `${minutes} 分钟`;
};

export const getPostUrl = (post: Post) => `/posts/${post.id}`;
export const getProjectUrl = (project: Project) => `/projects#${project.id}`;
export const getBookUrl = (book: Book) => book.data.noteUrl || `/books#${book.id}`;

export const getAllTags = (posts: Post[]) => {
	const tagCount = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
		}
	}
	return [...tagCount.entries()]
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
};

export const getRelatedPosts = (current: Post, posts: Post[], limit = 3) => {
	const currentTags = new Set(current.data.tags);
	return posts
		.filter((post) => post.id !== current.id)
		.map((post) => {
			const tagScore = post.data.tags.filter((tag) => currentTags.has(tag)).length;
			const categoryScore = post.data.category === current.data.category ? 1 : 0;
			return { post, score: tagScore * 2 + categoryScore };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
		.slice(0, limit)
		.map(({ post }) => post);
};
