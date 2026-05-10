import Link from 'next/link'

export type C1RateSnapshotItem = {
	label: string
	rate: string
	sublabel?: string
	linkHref?: string
	linkLabel?: string
}

export function C1RateSnapshot({
	items,
	updatedAt,
}: {
	items: C1RateSnapshotItem[]
	updatedAt?: string
}) {
	if (!items?.length) return null

	return (
		<div className="mb-10">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((item, i) => (
					<div
						key={`${item.label}-${i}`}
						className="rounded-2xl bg-white p-5 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0px_8px_35px_0px_rgba(0,0,0,0.08)]"
					>
						<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#6A7283]">
							{item.label}
						</p>
						<p className="text-3xl font-extrabold text-[#074C3E]">
							{item.rate}
						</p>
						{item.sublabel && (
							<p className="mt-1 text-sm text-[#6A7283]">
								{item.sublabel}
							</p>
						)}
						{item.linkHref && (
							<Link
								href={item.linkHref}
								className="mt-3 inline-block text-sm font-semibold text-[#222E48] underline underline-offset-4 transition-colors hover:text-[#074C3E]"
							>
								{item.linkLabel || 'View details'} →
							</Link>
						)}
					</div>
				))}
			</div>
			{updatedAt && (
				<p className="mt-3 text-xs text-[#6A7283]">
					Rates updated {updatedAt}. Your rate depends on lender
					assessment.
				</p>
			)}
		</div>
	)
}
