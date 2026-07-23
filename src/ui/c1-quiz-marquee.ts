const MARQUEE_PIXELS_PER_MILLISECOND = 0.014

export function advanceMarqueePosition(current: number, elapsed: number, loopPoint: number) {
	const next = current + Math.max(0, elapsed) * MARQUEE_PIXELS_PER_MILLISECOND
	if (loopPoint <= 0) return next
	return next >= loopPoint ? next % loopPoint : next
}
