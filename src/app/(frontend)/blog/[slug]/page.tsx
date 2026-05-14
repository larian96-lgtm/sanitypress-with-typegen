import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { c1PageLookup } from '@/lib/c1-pages'
import { buildC1Metadata } from '@/lib/c1-seo'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import type { BLOG_POST_QUERY_RESULT } from '@/sanity/types'
import C1ContentPage from '@/ui/c1-content-page'
import ModulesResolver from '@/ui/modules'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ({ params }: Props) {
	const { slug } = await params

	// Check C1 hardcoded pages first
	const c1Key = `/${ROUTES.blog}/${slug}`
	const c1Page = c1PageLookup[c1Key]
	if (c1Page) return <C1ContentPage page={c1Page} />

	try {
		const post = await getPost(slug)
		if (post) return <ModulesResolver post={post} />
	} catch {
		// Sanity not seeded — fall through
	}

	if (c1Page) return <C1ContentPage page={c1Page} />
	notFound()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const c1Key = `/${ROUTES.blog}/${slug}`
	const c1Page = c1PageLookup[c1Key]

	if (c1Page) {
		return buildC1Metadata({
			path: c1Key,
			title: c1Page.seoTitle,
			description: c1Page.seoDescription,
			type: c1Page.type === 'blog' || c1Page.type === 'lender' || c1Page.type === 'advertorial' ? 'article' : 'website',
			noIndex: c1Page.type === 'advertorial',
		})
	}

	try {
		const post = await getPost(slug)
		const { title, description, image, noIndex } = post?.metadata ?? {}
		const path = `/${ROUTES.blog}/${slug}`
		const pageTitle = title || 'Comparison One Blog'
		const pageDescription = description || 'Australian SME funding guides.'
		const baseMetadata = buildC1Metadata({
			path,
			title: pageTitle,
			description: pageDescription,
			type: 'article',
			noIndex: Boolean(noIndex),
		})
		return {
			...baseMetadata,
			openGraph: {
				...baseMetadata.openGraph,
				images: [image ? urlFor(image).width(1200).url() : `https://www.comparisonone.com/api/og?slug=${ROUTES.blog}/${slug}`],
			},
			alternates: {
				...baseMetadata.alternates,
				types: { 'application/rss+xml': `/${ROUTES.blog}/rss.xml` },
			},
		}
	} catch {
		return buildC1Metadata({
			path: `/${ROUTES.blog}/${slug}`,
			title: 'Comparison One Blog',
			description: 'Australian SME funding guides.',
			type: 'article',
		})
	}
}

async function getPost(slug: string) {
	return await sanityFetchLive<BLOG_POST_QUERY_RESULT>({
		query: BLOG_POST_QUERY,
		params: { slug, blogDir: `${ROUTES.blog}/` },
	})
}

const BLOG_POST_QUERY = groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
	...,
	content[]{
		...,
		_type == 'image' => { ..., asset-> }
	},
	'contentPlainText': pt::text(content),
	'readTime': length(string::split(pt::text(content), ' ')) / 200,
	'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
		style,
		'text': pt::text(@)
	},
	'modules': ([
		*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
		+ *[_type == 'global-module' && path == $blogDir].before[]{ ${MODULES_QUERY} }
		+ *[_type == 'global-module' && _id == 'global-module-blog-post'].before[]{ ${MODULES_QUERY} }
		+ *[_type == 'global-module' && path == $blogDir].after[]{ ${MODULES_QUERY} }
		+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
	])
}
`
