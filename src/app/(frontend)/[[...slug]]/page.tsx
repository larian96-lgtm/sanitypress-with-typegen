import pkg from '@@/package.json'
import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { c1PageLookup, type C1PageData } from '@/lib/c1-pages'
import { c1FallbackRateTable, type C1RateTableData } from '@/lib/c1-rate-table'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import {
	getSite,
	GLOBAL_MODULE_PATH_QUERY,
	MODULES_QUERY,
} from '@/sanity/lib/queries'
import type { PAGE_QUERY_RESULT } from '@/sanity/types'
import C1ContentPage from '@/ui/c1-content-page'
import C1Homepage, { c1HomepageFallback, type C1HomepageData } from '@/ui/c1-homepage'
import C1LegalPage from '@/ui/c1-legal-page'
import C1QuotePage from '@/ui/c1-quote-page'
import ModulesResolver from '@/ui/modules'

type Props = {
	params: Promise<{ slug?: string[] }>
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: Props) {
	const { slug } = await params
	const slugStr = slug ? slug.join('/') : 'index'

	// Check C1 hardcoded pages first
	const path = slugStr === 'index' ? '/' : `/${slugStr}`
	if (path === '/quiz') return <C1QuotePage />
	if (isLegalPath(path)) return <C1LegalPage path={path} />
	const cmsC1Page = await getC1CmsPage(path)
	const rateTable = await getC1RateTable(cmsC1Page?.rateComparisonTable?.rateTableSlug || 'business-loans-rates')
	if (cmsC1Page) return <C1ContentPage page={cmsC1Page} rateTable={rateTable} />
	const c1Page = c1PageLookup[path]

	if (c1Page) {
		if (path === '/') return <C1Homepage data={await getC1Homepage()} />
		return <C1ContentPage page={c1Page} rateTable={rateTable} />
	}

	// Try Sanity
	try {
		const page = await getPage(slug)
		if (page) return <ModulesResolver page={page} />
	} catch {
		// Sanity not seeded
	}

	if (slugStr === 'index') return <C1Homepage data={await getC1Homepage()} />
	notFound()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const slugStr = slug ? slug.join('/') : 'index'
	const path = slugStr === 'index' ? '/' : `/${slugStr}`
	if (path === '/') {
		const homepage = await getC1Homepage()
		return {
			title: homepage?.seoTitle || c1HomepageFallback.seoTitle,
			description: homepage?.seoDescription || c1HomepageFallback.seoDescription,
		}
	}
	if (path === '/quiz') {
		return {
			title: 'Compare Business Finance Options | Comparison One',
			description: 'Start a Comparison One enquiry for Australian SME business funding options after checking amount, purpose and document readiness.',
		}
	}
	if (isLegalPath(path)) {
		const title = path === '/privacy-policy' ? 'Privacy Policy' : path === '/terms-and-conditions' ? 'Terms & Conditions' : 'Editorial Policy'
		return { title: `${title} | Comparison One`, description: `${title} for Comparison One.` }
	}
	const cmsC1Page = await getC1CmsPage(path)
	if (cmsC1Page) {
		return { title: cmsC1Page.seoTitle, description: cmsC1Page.seoDescription }
	}
	const c1Page = c1PageLookup[path]

	if (c1Page) {
		return {
			title: c1Page.seoTitle,
			description: c1Page.seoDescription,
			openGraph: {
				title: c1Page.seoTitle,
				description: c1Page.seoDescription,
			},
		}
	}

	try {
		const [page, site] = await Promise.all([getPage(slug), getSite()])
		const { title, description, image, noIndex } = page?.metadata ?? {}
		return {
			title,
			description,
			openGraph: {
				title,
				description,
				url: [process.env.NEXT_PUBLIC_BASE_URL, slug?.join('/')]
					.filter(Boolean)
					.join('/'),
				images: [
					image
						? urlFor(image).width(1200).url()
						: site?.ogimage
							? urlFor(site.ogimage).width(1200).url()
							: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${slug?.join('/')}`,
				],
			},
			robots: { index: noIndex ? false : undefined },
			alternates: { types: { 'application/rss+xml': `/${ROUTES.blog}/rss.xml` } },
			generator: `SanityPress v${pkg.version}`,
		}
	} catch {
		return { title: 'Comparison One', description: 'Australian SME business funding comparison.' }
	}
}

export async function generateStaticParams() {
	// Include all C1 paths for SSG
	const c1Paths = [
		...Object.keys(c1PageLookup)
			.filter((p) => p !== '/')
			.map((p) => ({ slug: p.replace(/^\//, '').split('/') })),
		{ slug: ['quiz'] },
		{ slug: ['privacy-policy'] },
		{ slug: ['terms-and-conditions'] },
		{ slug: ['editorial-policy'] },
	]

	try {
		const [slugs, c1CmsPaths] = await Promise.all([
			client.fetch<string[]>(
				groq`*[_type == 'page' && defined(metadata.slug.current) && !(metadata.slug.current in ['404'])].metadata.slug.current`,
			),
			client.fetch<string[]>(groq`*[_type == 'c1.contentPage' && defined(path)].path`),
		])
		const sanityPaths = slugs.map((s) => ({
			slug: s === 'index' ? [] : s.split('/'),
		}))
		const c1CmsStaticPaths = c1CmsPaths.map((p) => ({ slug: p.replace(/^\//, '').split('/') }))
		return [...c1Paths, ...sanityPaths, ...c1CmsStaticPaths]
	} catch {
		return c1Paths
	}
}

async function getPage(slug?: string[]) {
	return await sanityFetchLive<PAGE_QUERY_RESULT>({
		query: PAGE_QUERY,
		params: { slug: slug ? slug.join('/') : 'index' },
	})
}

type LegalPath = '/privacy-policy' | '/terms-and-conditions' | '/editorial-policy'

function isLegalPath(path: string): path is LegalPath {
	return path === '/privacy-policy' || path === '/terms-and-conditions' || path === '/editorial-policy'
}

async function getC1Homepage(): Promise<C1HomepageData | null> {
	try {
		return await sanityFetchLive<C1HomepageData | null>({ query: C1_HOMEPAGE_QUERY })
	} catch {
		return null
	}
}

const C1_HOMEPAGE_QUERY = groq`
	*[_type == 'c1.homepage'][0]{
		title,
		heroEyebrow,
		heroHeadline,
		heroSubtitle,
		heroImage,
		heroImageAlt,
		primaryCtaLabel,
		secondaryCtaLabel,
		secondaryCtaHref,
		trustStrip,
		whyEyebrow,
		whyHeading,
		whyBody,
		whyCards[]{ title, description },
		docEyebrow,
		docHeading,
		docBody,
		docCtaLabel,
		docCtaHref,
		checklist,
		pathwayEyebrow,
		pathwayHeading,
		pathwayCards[]{ title, description, href, linkLabel },
		declineHeading,
		declineBody,
		declineCtaLabel,
		declineCtaHref,
		guideHeading,
		guideCards[]{ title, description, href, linkLabel },
		faqHeading,
		faqs[]{ question, answer },
		finalHeading,
		finalBody,
		finalCtaLabel,
		finalCtaHref,
		seoTitle,
		seoDescription
	}
`

async function getC1CmsPage(path: string): Promise<C1PageData | null> {
	try {
		return await client.fetch<C1PageData | null>(C1_CONTENT_PAGE_QUERY, { path })
	} catch {
		return null
	}
}

async function getC1RateTable(slug: string): Promise<C1RateTableData> {
	try {
		const table = await client.fetch<C1RateTableData | null>(C1_RATE_TABLE_QUERY, { slug })
		if (!table || !table.rows?.length) return c1FallbackRateTable
		return table
	} catch {
		return c1FallbackRateTable
	}
}

const C1_RATE_TABLE_QUERY = groq`
	*[_type == 'c1.rateTable' && slug.current == $slug][0]{
		'slug': slug.current,
		title,
		updatedAt,
		methodologyNote,
		'rows': rows[coalesce(isActive, true) == true]{
			'id': coalesce(_key, lenderSlug + '-' + productType),
			lenderSlug,
			lenderName,
			productName,
			productType,
			rateFrom,
			rateTo,
			comparisonRate,
			minAmount,
			maxAmount,
			minTermMonths,
			maxTermMonths,
			fundingSpeed,
			securityType,
			bestFor,
			updatedAt,
			'isActive': coalesce(isActive, true)
		}
	}
`

const C1_CONTENT_PAGE_QUERY = groq`
	*[_type == 'c1.contentPage' && path == $path][0]{
		type,
		title,
		'slug': coalesce(slug.current, path),
		path,
		eyebrow,
		headline,
		summary,
		'seoTitle': coalesce(seoTitle, title),
		'seoDescription': coalesce(seoDescription, summary),
		'primaryCtaLabel': coalesce(primaryCtaLabel, 'Compare now'),
		'primaryCtaHref': coalesce(primaryCtaHref, '/quiz'),
		'lastReviewed': coalesce(lastReviewed, '2026-05-05'),
		'proofPoints': coalesce(proofPoints, []),
		rateSnapshot[]{ label, rate, sublabel, linkHref, linkLabel },
		rateComparisonTable{ headline, updatedAt, rateTableSlug, showFilters, sortable, defaultProductTypes, defaultLenderSlug, methodologyNote },
		sections[]{ heading, body, bullets, table{ headers, 'rows': rows[].cells } },
		faqs[]{ question, answer },
		relatedLinks[]{ label, href }
	}
`

const PAGE_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == $slug][0]{
		...,
		'modules': (
			*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
			+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].before[]{ ${MODULES_QUERY} }
			+ modules[]{ ${MODULES_QUERY} }
			+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].after[]{ ${MODULES_QUERY} }
			+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
		)
	}
`
