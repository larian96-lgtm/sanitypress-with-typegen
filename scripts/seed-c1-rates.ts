import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { c1FallbackRateTable } from '../src/lib/c1-rate-table'

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

if (!projectId || !token) {
	console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN/SANITY_AUTH_TOKEN')
	process.exit(1)
}

async function main() {
	const rateTableDoc = {
		_id: 'c1.rateTable.business-loans-rates',
		_type: 'c1.rateTable',
		title: c1FallbackRateTable.title,
		slug: { _type: 'slug', current: c1FallbackRateTable.slug },
		updatedAt: c1FallbackRateTable.updatedAt,
		methodologyNote: c1FallbackRateTable.methodologyNote,
		rows: c1FallbackRateTable.rows.map((row, index) => ({
			_key: row.id || `${row.lenderSlug}-${row.productType}-${index}`,
			_type: 'c1.lenderRateRow',
			lenderSlug: row.lenderSlug,
			lenderName: row.lenderName,
			productName: row.productName,
			productType: row.productType,
			rateFrom: row.rateFrom,
			rateTo: row.rateTo,
			comparisonRate: row.comparisonRate,
			minAmount: row.minAmount,
			maxAmount: row.maxAmount,
			minTermMonths: row.minTermMonths,
			maxTermMonths: row.maxTermMonths,
			fundingSpeed: row.fundingSpeed,
			securityType: row.securityType,
			bestFor: row.bestFor,
			updatedAt: row.updatedAt,
			isActive: row.isActive,
		})),
	}

	const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			mutations: [{ createOrReplace: rateTableDoc }],
		}),
	})

	const body = await response.text()
	if (!response.ok) {
		console.error(`Sanity mutation failed: ${response.status} ${response.statusText}`)
		console.error(body.slice(0, 1000))
		process.exit(1)
	}

	console.log(`Seeded c1.rateTable with ${rateTableDoc.rows.length} lender rate rows into ${dataset}.`)
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
