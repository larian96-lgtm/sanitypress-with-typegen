import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { c1AllPages } from '../src/lib/c1-pages'
import { c1HomepageFallback } from '../src/ui/c1-homepage'

function loadEnvFile(path: string) {
	if (!existsSync(path)) return
	for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
		const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
		if (!match) continue
		const [, key, rawValue] = match
		if (process.env[key]) continue
		process.env[key] = rawValue.replace(/^['"]|['"]$/g, '')
	}
}

loadEnvFile(resolve(process.cwd(), '.env.local'))
loadEnvFile(resolve(process.env.HOME || '~', '.hermes/.env'))

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-09'

if (!projectId || !dataset || !token) {
	console.error('Missing Sanity projectId, dataset or write token. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN.')
	process.exit(1)
}

const slugifyId = (value: string) => value.replace(/^\//, 'index').replace(/[^a-zA-Z0-9_.-]+/g, '-').replace(/^-+|-+$/g, '') || 'index'

const contentDocs = c1AllPages.map((page) => ({
	_id: `c1.contentPage.${slugifyId(page.path)}`,
	_type: 'c1.contentPage',
	type: page.type,
	title: page.title,
	slug: { _type: 'slug', current: page.slug },
	path: page.path,
	eyebrow: page.eyebrow,
	headline: page.headline,
	summary: page.summary,
	primaryCtaLabel: page.primaryCtaLabel,
	primaryCtaHref: page.primaryCtaHref,
	proofPoints: page.proofPoints,
	sections: page.sections?.map((section) => ({
		_key: slugifyId(section.heading).slice(0, 64),
		heading: section.heading,
		body: section.body,
		bullets: section.bullets,
		table: section.table ? {
			headers: section.table.headers,
			rows: section.table.rows.map((cells, index) => ({ _key: `${slugifyId(section.heading).slice(0, 40)}-${index}`, cells })),
		} : undefined,
	})) || [],
	faqs: page.faqs?.map((faq) => ({ _key: slugifyId(faq.question).slice(0, 64), ...faq })) || [],
	relatedLinks: page.relatedLinks?.map((link) => ({ _key: slugifyId(`${link.label}-${link.href}`).slice(0, 64), ...link })) || [],
	seoTitle: page.seoTitle,
	seoDescription: page.seoDescription,
	lastReviewed: page.lastReviewed,
	authorTitle: 'Comparison One SME Finance Editorial Team',
}))

const homepageDoc = {
	_id: 'c1.homepage.main',
	_type: 'c1.homepage',
	...c1HomepageFallback,
}

async function main() {
	const mutations = [...contentDocs, homepageDoc].map((doc) => ({ createOrReplace: doc }))
	const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ mutations }),
	})

	const text = await response.text()
	if (!response.ok) {
		console.error(`Sanity mutation failed: ${response.status} ${response.statusText}`)
		console.error(text.slice(0, 1000))
		process.exit(1)
	}

	console.log(`Seeded ${contentDocs.length} C1 content pages and 1 homepage document into Sanity dataset ${dataset}.`)
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
