export type C1SpecialRoute = 'quote' | 'matching-engine' | 'thanks'

export function getC1SpecialRoute(path: string): C1SpecialRoute | null {
	if (path === '/quiz' || path === '/funding-fit-check') return 'quote'
	if (path === '/business-loans/matching-engine') return 'matching-engine'
	if (path === '/thanks') return 'thanks'
	return null
}
