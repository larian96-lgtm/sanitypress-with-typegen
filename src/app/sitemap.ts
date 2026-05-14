import type { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { c1AllPages } from '@/lib/c1-pages'
import { ROUTES } from '@/lib/env'
import { sanityFetchLive } from '@/sanity/lib/live'

export const dynamic = 'force-dynamic'

const CANONICAL_BASE_URL = 'https://www.comparisonone.com'

const STATIC_C1_PATHS = ['/', '/quiz', '/privacy-policy', '/terms-and-conditions', '/editorial-policy']
const STATIC_LAST_MODIFIED = new Date('2026-05-13T00:00:00.000Z')

function normaliseLastModified(value?: string) {
	if (!value) return STATIC_LAST_MODIFIED
	const parsed = new Date(value)
	if (Number.isNaN(parsed.getTime())) return STATIC_LAST_MODIFIED
	return parsed
}

function c1Priority(path: string) {
	if (path === '/') return 1
	if (path === '/business-loans' || path === '/lenders') return 0.9
	if (path.startsWith('/business-loans') || path.startsWith('/compare') || path.startsWith('/lenders')) return 0.7
	return 0.5
}

export default async function (): Promise<MetadataRoute.Sitemap> {
	let sanityUrls: MetadataRoute.Sitemap = []

	try {
		const data = await sanityFetchLive<{
			pages: MetadataRoute.Sitemap
			posts: MetadataRoute.Sitemap
		}>({
			query: groq`{
				'pages': *[
					_type == 'page'
					&& defined(metadata.slug.current)
					&& !(metadata.slug.current in ['404'])
					&& metadata.noIndex != true
				]|order(metadata.slug.current != 'index', metadata.slug.current){
					'url': $baseUrl + select(
						metadata.slug.current == 'index' => '',
						'/' + metadata.slug.current
					),
					'lastModified': _updatedAt,
					'priority': select(
						metadata.slug.current == 'index' => 1,
						0.5
					)
				},
				'posts': *[
					_type == 'blog.post'
					&& defined(metadata.slug.current)
					&& metadata.noIndex != true
				]|order(publishDate desc){
					'url': $baseUrl + '/' + $blogDir + '/' + metadata.slug.current,
					'lastModified': _updatedAt,
					'priority': 0.4
				}
			}`,
			params: {
				baseUrl: CANONICAL_BASE_URL,
				blogDir: ROUTES.blog,
			},
		})

		sanityUrls = Object.values(data).flat()
	} catch {
		sanityUrls = []
	}

	const baseUrl = CANONICAL_BASE_URL
	const staticUrls: MetadataRoute.Sitemap = STATIC_C1_PATHS.map((path) => ({
		url: `${baseUrl}${path === '/' ? '' : path}`,
		lastModified: STATIC_LAST_MODIFIED,
		priority: c1Priority(path),
	}))
	const c1Urls: MetadataRoute.Sitemap = c1AllPages.map((page) => ({
		url: `${baseUrl}${page.path}`,
		lastModified: normaliseLastModified(page.lastReviewed),
		priority: c1Priority(page.path),
	}))

	return Array.from(
		new Map([...staticUrls, ...c1Urls, ...sanityUrls].map((entry) => [entry.url, entry])).values(),
	)
}
