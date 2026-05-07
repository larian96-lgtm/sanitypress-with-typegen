import {
	defineDocuments,
	defineLocations,
	presentationTool,
} from 'sanity/presentation'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'

export default presentationTool({
	previewUrl: {
		previewMode: {
			enable: '/api/draft-mode/enable',
			disable: '/api/draft-mode/disable',
		},
	},
	resolve: {
		mainDocuments: defineDocuments([
			{
				route: '/',
				filter: groq`_type == 'c1.homepage'`,
			},
			{
				route: '/:slug',
				filter: groq`_type == 'c1.contentPage' && path == '/' + $slug`,
			},
			{
				route: '/',
				filter: groq`_type == 'page' && metadata.slug.current == $slug`,
				params: { slug: 'index' },
			},
			{
				route: '/:slug',
				filter: groq`_type == 'page' && metadata.slug.current == $slug`,
			},
			{
				route: `/${ROUTES.blog}/:slug`,
				filter: groq`_type == 'blog.post' && metadata.slug.current == $slug`,
			},
		]),
		locations: {
			// global
			site: defineLocations({
				message: 'Global settings used on all pages',
				tone: 'positive',
			}),
			'global-module': defineLocations({
				message: 'Modules are added to all pages in the target path',
				tone: 'positive',
			}),
			// Used on...
			page: defineLocations({
				select: { title: 'title', slug: 'metadata.slug.current' },
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title,
							href: !doc?.slug || doc.slug === 'index' ? '/' : `/${doc.slug}`,
						},
					],
				}),
			}),
			'blog.post': defineLocations({
				select: { title: 'metadata.title', slug: 'metadata.slug.current' },
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title,
							href: doc?.slug
								? `/${ROUTES.blog}/${doc.slug}`
								: `/${ROUTES.blog}`,
						},
					],
				}),
			}),
			'c1.homepage': defineLocations({
				message: 'Used on the Comparison One homepage',
				tone: 'positive',
				resolve: () => ({ locations: [{ title: 'Comparison One Homepage', href: '/' }] }),
			}),
			'c1.contentPage': defineLocations({
				select: { title: 'title', path: 'path' },
				resolve: (doc) => ({
					locations: [{ title: doc?.title, href: doc?.path || '/' }],
				}),
			}),
		},
	},
})
