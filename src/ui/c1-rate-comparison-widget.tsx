'use client'

import { useMemo, useState } from 'react'
import type { C1LenderRateRow, C1RateProductType } from '@/lib/c1-rate-table'
import { C1RateFilterBar, type C1RateFilters } from '@/ui/c1-rate-filter-bar'
import { C1RateComparisonTable } from '@/ui/c1-rate-comparison-table'

type Props = {
	title?: string
	updatedAt?: string
	methodologyNote?: string
	showFilters?: boolean
	sortable?: boolean
	defaultProductTypes?: C1RateProductType[]
	defaultLenderSlug?: string
	rows: C1LenderRateRow[]
}

type SortKey = 'rateAsc' | 'rateDesc' | 'amountAsc' | 'amountDesc'

function daysSince(dateString?: string): number | null {
	if (!dateString) return null
	const parsed = new Date(dateString)
	if (Number.isNaN(parsed.getTime())) return null
	const diffMs = Date.now() - parsed.getTime()
	return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

function prettyDate(dateString?: string): string {
	if (!dateString) return 'Date unavailable'
	const parsed = new Date(dateString)
	if (Number.isNaN(parsed.getTime())) return dateString
	return parsed.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function C1RateComparisonWidget({
	title = 'Compare business loans and rates in Australia',
	updatedAt,
	methodologyNote,
	showFilters = true,
	sortable = true,
	defaultProductTypes,
	defaultLenderSlug,
	rows,
}: Props) {
	const activeRows = useMemo(() => rows.filter((row) => row.isActive), [rows])
	const availableProductTypes = useMemo(
		() => Array.from(new Set(activeRows.map((row) => row.productType))),
		[activeRows],
	)

	const startingProductTypes =
		defaultProductTypes && defaultProductTypes.length > 0
			? defaultProductTypes.filter((type) => availableProductTypes.includes(type))
			: availableProductTypes

	const [filters, setFilters] = useState<C1RateFilters>({
		productTypes: startingProductTypes.length > 0 ? startingProductTypes : availableProductTypes,
		security: 'all',
		amount: null,
	})
	const [sortKey, setSortKey] = useState<SortKey>('rateAsc')

	const filteredRows = useMemo(() => {
		let next = activeRows.filter((row) => filters.productTypes.includes(row.productType))

		if (defaultLenderSlug) {
			next = next.filter((row) => row.lenderSlug === defaultLenderSlug)
		}

		if (filters.security !== 'all') {
			next = next.filter((row) => row.securityType === filters.security)
		}

		if (typeof filters.amount === 'number') {
			next = next.filter((row) => filters.amount! >= row.minAmount && filters.amount! <= row.maxAmount)
		}

		if (!sortable) return next

		const sorted = [...next]
		sorted.sort((a, b) => {
			switch (sortKey) {
				case 'rateDesc':
					return b.rateFrom - a.rateFrom
				case 'amountAsc':
					return a.minAmount - b.minAmount
				case 'amountDesc':
					return b.maxAmount - a.maxAmount
				case 'rateAsc':
				default:
					return a.rateFrom - b.rateFrom
			}
		})
		return sorted
	}, [activeRows, defaultLenderSlug, filters, sortable, sortKey])

	const staleDays = daysSince(updatedAt)
	const stale = staleDays !== null && staleDays > 30
	const badgeLabel = stale
		? 'Rates being reviewed'
		: `Rates updated ${prettyDate(updatedAt)}`

	return (
		<section className="rounded-3xl bg-[#F5F8F6] p-4 md:p-6">
			<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
				<div>
					<h2 className="text-xl font-bold text-[#222E48] md:text-2xl">{title}</h2>
					<p className="mt-1 text-xs text-[#6A7283]">Filter by product, amount and security type to narrow suitable options.</p>
				</div>
				<span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${stale ? 'bg-[#FFF3E0] text-[#8A5B00]' : 'bg-[#E5F3EF] text-[#074C3E]'}`}>
					{badgeLabel}
				</span>
			</div>

			<C1RateFilterBar
				availableProductTypes={availableProductTypes}
				filters={filters}
				onToggleProductType={(productType) => {
					setFilters((current) => {
						const has = current.productTypes.includes(productType)
						const nextTypes = has
							? current.productTypes.filter((item) => item !== productType)
							: [...current.productTypes, productType]
						return {
							...current,
							productTypes: nextTypes.length > 0 ? nextTypes : availableProductTypes,
						}
					})
				}}
				onSecurityChange={(security) => setFilters((current) => ({ ...current, security }))}
				onAmountChange={(amount) => setFilters((current) => ({ ...current, amount }))}
				showFilters={showFilters}
			/>

			{sortable && (
				<div className="mb-4 flex items-center gap-2 text-sm text-[#4E5A72]">
					<label htmlFor="rate-sort" className="font-medium">Sort by</label>
					<select
						id="rate-sort"
						value={sortKey}
						onChange={(event) => setSortKey(event.target.value as SortKey)}
						className="rounded-xl border border-[#DCE3E0] bg-white px-3 py-2 text-sm text-[#222E48]"
					>
						<option value="rateAsc">Rate: low to high</option>
						<option value="rateDesc">Rate: high to low</option>
						<option value="amountAsc">Minimum amount: low to high</option>
						<option value="amountDesc">Maximum amount: high to low</option>
					</select>
				</div>
			)}

			<C1RateComparisonTable rows={filteredRows} amountForCta={filters.amount} />

			<p className="mt-4 text-xs leading-relaxed text-[#6A7283]">
				{methodologyNote ||
					'Rates shown are advertised starting rates from lender public information. Your actual rate depends on lender assessment and your business profile.'}
			</p>
		</section>
	)
}
