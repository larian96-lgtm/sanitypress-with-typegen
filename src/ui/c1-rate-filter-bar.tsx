'use client'

import type { C1RateProductType, C1SecurityType } from '@/lib/c1-rate-table'
import { cn } from '@/lib/utils'

export type C1RateFilters = {
	productTypes: C1RateProductType[]
	security: C1SecurityType | 'all'
	amount: number | null
}

type Props = {
	availableProductTypes: C1RateProductType[]
	filters: C1RateFilters
	onToggleProductType: (type: C1RateProductType) => void
	onSecurityChange: (value: C1SecurityType | 'all') => void
	onAmountChange: (value: number | null) => void
	showFilters: boolean
}

const PRODUCT_TYPE_LABELS: Record<C1RateProductType, string> = {
	secured: 'Secured',
	unsecured: 'Unsecured',
	lineOfCredit: 'Line of credit',
	equipment: 'Equipment',
	invoice: 'Invoice',
	vehicle: 'Vehicle',
	workingCapital: 'Working capital',
}

export function C1RateFilterBar({
	availableProductTypes,
	filters,
	onToggleProductType,
	onSecurityChange,
	onAmountChange,
	showFilters,
}: Props) {
	if (!showFilters) return null

	return (
		<div className="mb-5 space-y-4 rounded-2xl border border-[#DCE3E0] bg-white p-4 md:p-5">
			<div>
				<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6A7283]">Product type</p>
				<div className="flex flex-wrap gap-2">
					{availableProductTypes.map((productType) => {
						const active = filters.productTypes.includes(productType)
						return (
							<button
								type="button"
								key={productType}
								onClick={() => onToggleProductType(productType)}
								className={cn(
									'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
									active
										? 'border-[#074C3E] bg-[#074C3E] text-white'
										: 'border-[#DCE3E0] bg-white text-[#3C4558] hover:border-[#074C3E] hover:text-[#074C3E]',
								)}
							>
								{PRODUCT_TYPE_LABELS[productType]}
							</button>
						)
					})}
				</div>
			</div>

			<div className="grid gap-3 md:grid-cols-2">
				<label className="block">
					<span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#6A7283]">Loan amount</span>
					<input
						type="number"
						inputMode="numeric"
						min={0}
						value={filters.amount ?? ''}
						onChange={(event) => {
							const value = Number(event.target.value)
							onAmountChange(Number.isFinite(value) && value > 0 ? value : null)
						}}
						placeholder="e.g. 120000"
						className="w-full rounded-xl border border-[#DCE3E0] px-3 py-2 text-sm text-[#222E48] outline-none ring-[#074C3E] focus:ring-2"
					/>
				</label>

				<label className="block">
					<span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#6A7283]">Security</span>
					<select
						value={filters.security}
						onChange={(event) => onSecurityChange(event.target.value as C1SecurityType | 'all')}
						className="w-full rounded-xl border border-[#DCE3E0] bg-white px-3 py-2 text-sm text-[#222E48] outline-none ring-[#074C3E] focus:ring-2"
					>
						<option value="all">All</option>
						<option value="secured">Secured</option>
						<option value="unsecured">Unsecured</option>
						<option value="asset-backed">Asset-backed</option>
					</select>
				</label>
			</div>
		</div>
	)
}
