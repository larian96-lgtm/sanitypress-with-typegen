import type { MetadataRoute } from 'next'

const CANONICAL_BASE_URL = 'https://www.comparisonone.com'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = CANONICAL_BASE_URL

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin', '/studio/api'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	}
}
