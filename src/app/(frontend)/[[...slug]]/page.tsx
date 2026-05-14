import pkg from '@@/package.json'
import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { c1PageLookup, type C1PageData } from '@/lib/c1-pages'
import { buildC1Metadata, c1OgImageUrl } from '@/lib/c1-seo'
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
import C1AdvertorialPage from '@/ui/c1-advertorial-page'
import C1ContentPage from '@/ui/c1-content-page'
import C1Homepage, { type C1HomepageData } from '@/ui/c1-homepage'
import C1LegalPage from '@/ui/c1-legal-page'
import C1QuotePage from '@/ui/c1-quote-page'
import ModulesResolver from '@/ui/modules'

type Props = {
	params: Promise<{ slug?: string[] }>
}

export const dynamic = 'force-dynamic'


const C1_HOMEPAGE_SEO_TITLE = 'Business Loan Comparison Australia | Funding Fit Check | Comparison One'
const C1_HOMEPAGE_SEO_DESCRIPTION = 'Check business funding readiness before applying. See what documents lenders may ask for and compare bank, non-bank and specialist funding paths by fit.'

export default async function Page({ params }: Props) {
	const { slug } = await params
	const slugStr = slug ? slug.join('/') : 'index'

	// Check C1 hardcoded pages first
	const path = slugStr === 'index' ? '/' : `/${slugStr}`
	if (path === '/quiz') return <C1QuotePage />
	if (isLegalPath(path)) return <C1LegalPage path={path} />
	const c1Page = c1PageLookup[path]
	if (c1Page?.type === 'advertorial') return <C1AdvertorialPage page={c1Page} />

	const cmsC1Page = await getC1CmsPage(path)
	const rateTable = await getC1RateTable(cmsC1Page?.rateComparisonTable?.rateTableSlug || 'business-loans-rates')
	if (cmsC1Page) {
		if (cmsC1Page.type === 'advertorial') return <C1AdvertorialPage page={cmsC1Page} />
		return <C1ContentPage page={cmsC1Page} rateTable={rateTable} />
	}

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
		return buildC1Metadata({
			path,
			title: homepage?.seoTitle || C1_HOMEPAGE_SEO_TITLE,
			description: homepage?.seoDescription || C1_HOMEPAGE_SEO_DESCRIPTION,
		})
	}
	if (path === '/quiz') {
		return buildC1Metadata({
			path,
			title: 'Compare Business Finance Options | Comparison One',
			description: 'Start a Comparison One enquiry for Australian SME business funding options after checking amount, purpose and document readiness.',
			noIndex: true,
		})
	}
	if (isLegalPath(path)) {
		const title = path === '/privacy-policy'
			? 'Privacy Policy'
			: path === '/terms-and-conditions'
				? 'Terms & Conditions'
				: path === '/editorial-policy'
					? 'Editorial Policy'
					: path === '/contact'
						? 'Contact'
						: 'About'
		return buildC1Metadata({ path, title: `${title} | Comparison One`, description: `${title} for Comparison One.` })
	}
	const c1Page = c1PageLookup[path]
	if (c1Page?.type === 'advertorial') {
		return buildC1Metadata({
			path,
			title: c1Page.seoTitle,
			description: c1Page.seoDescription,
			type: 'article',
			noIndex: true,
		})
	}

	const cmsC1Page = await getC1CmsPage(path)
	if (cmsC1Page) {
		return buildC1Metadata({
			path,
			title: cmsC1Page.seoTitle,
			description: cmsC1Page.seoDescription,
			type: cmsC1Page.type === 'blog' || cmsC1Page.type === 'lender' || cmsC1Page.type === 'advertorial' ? 'article' : 'website',
			noIndex: cmsC1Page.type === 'advertorial',
		})
	}

	if (c1Page) {
		return buildC1Metadata({
			path,
			title: c1Page.seoTitle,
			description: c1Page.seoDescription,
			type: c1Page.type === 'blog' || c1Page.type === 'lender' || c1Page.type === 'advertorial' ? 'article' : 'website',
			noIndex: c1Page.type === 'advertorial',
		})
	}

	try {
		const [page, site] = await Promise.all([getPage(slug), getSite()])
		const { title, description, image, noIndex } = page?.metadata ?? {}
		const pageTitle = title || 'Comparison One'
		const pageDescription = description || 'Australian SME business funding comparison.'
		const baseMetadata = buildC1Metadata({ path, title: pageTitle, description: pageDescription, noIndex: Boolean(noIndex) })
		const fallbackImage = c1OgImageUrl(path)
		return {
			...baseMetadata,
			openGraph: {
				...baseMetadata.openGraph,
				title: pageTitle,
				description: pageDescription,
				images: [
					image
						? urlFor(image).width(1200).url()
						: site?.ogimage
							? urlFor(site.ogimage).width(1200).url()
							: fallbackImage,
				],
			},
			alternates: {
				...baseMetadata.alternates,
				types: { 'application/rss+xml': `/${ROUTES.blog}/rss.xml` },
			},
			generator: `SanityPress v${pkg.version}`,
		}
	} catch {
		return buildC1Metadata({ path, title: 'Comparison One', description: 'Australian SME business funding comparison.' })
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
		{ slug: ['about'] },
		{ slug: ['contact'] },
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

type LegalPath = '/privacy-policy' | '/terms-and-conditions' | '/editorial-policy' | '/about' | '/contact'

function isLegalPath(path: string): path is LegalPath {
	return path === '/privacy-policy' || path === '/terms-and-conditions' || path === '/editorial-policy' || path === '/about' || path === '/contact'
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
		testimonials[]{ quote, author, role },
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
