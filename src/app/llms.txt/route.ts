import { c1AllPages } from '@/lib/c1-pages'

export const dynamic = 'force-dynamic'

export function GET() {
	const baseUrl = 'https://www.comparisonone.com'
	const lines = [
		'# Comparison One',
		'',
		'Comparison One helps Australian SME owners avoid applying blind by comparing funding pathways by fit: use of funds, timing, documentation, security, cash flow and lender criteria.',
		'',
		'## Important compliance context',
		'',
		'- Comparison One is not a lender.',
		'- Comparison One is not a government agency.',
		'- Information is general information only, not financial, credit, legal, tax or accounting advice.',
		'- Funding approval, rates, timing and availability depend on lender criteria and business circumstances.',
		'',
		'## Crawlable funding guides',
		'',
		...c1AllPages.map((page) => `- ${page.title}: ${baseUrl}${page.path}`),
	]

	return new Response(lines.join('\n'), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	})
}
