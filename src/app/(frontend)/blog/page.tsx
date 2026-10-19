import type { Metadata } from 'next'
import { buildC1Metadata } from '@/lib/c1-seo'
import C1HubPage, { c1Hubs } from '@/ui/c1-hub-page'

export const metadata: Metadata = buildC1Metadata({
	path: '/blog',
	title: c1Hubs['/blog'].seoTitle,
	description: c1Hubs['/blog'].seoDescription,
})

export default function BlogIndexPage() {
	return <C1HubPage path='/blog' />
}
