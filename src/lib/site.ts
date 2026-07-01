export const site = {
	name: 'May',
	tagline: 'Creator & Builder',
	description: '记录技术、AI、产品、投资、读书与生活观察。',
	location: '中国北京',
	role: 'Android Developer',
	avatarText: 'M',
	url: 'https://teachermay.com',
	social: {
		github: '#',
		email: 'mailto:hello@example.com',
		newsletter: '#',
	},
	stats: {
		label: '访问统计',
		value: '本地预览',
	},
	nav: [
		{ label: '首页', href: '/' },
		{ label: '文章', href: '/posts' },
		{ label: '项目', href: '/projects' },
		{ label: '读书', href: '/books' },
		{ label: '归档', href: '/archive' },
		{ label: '关于', href: '/about' },
	],
	categories: ['技术', 'AI', '产品', '投资', '读书', '随笔', '项目记录', '生活'],
};

export type NavItem = (typeof site.nav)[number];
