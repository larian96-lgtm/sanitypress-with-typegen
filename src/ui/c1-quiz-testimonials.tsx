'use client'

import { useEffect, useRef } from 'react'

import { quizTestimonials } from '@/lib/c1-quiz-proof-data'

import { advanceMarqueePosition } from './c1-quiz-marquee'
import styles from './c1-quiz-testimonials.module.css'

function ReviewCards({ duplicate = false }: { duplicate?: boolean }) {
	return (
		<div className={styles.sequence} aria-hidden={duplicate || undefined}>
			{quizTestimonials.map((review, index) => (
				<article key={`${review.name}-${index}-${duplicate ? 'copy' : 'original'}`} className={styles.reviewCard}>
					<div className={styles.stars} aria-label={duplicate ? undefined : '5 out of 5 stars'}>★★★★★</div>
					<blockquote>“{review.quote}”</blockquote>
					<p><strong>{review.name}</strong> · {review.when}</p>
				</article>
			))}
		</div>
	)
}

export default function C1QuizTestimonials() {
	const scrollerRef = useRef<HTMLDivElement>(null)
	const pausedRef = useRef(false)
	const scrollPositionRef = useRef(0)

	useEffect(() => {
		const scroller = scrollerRef.current
		if (!scroller) return

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
		let frame = 0
		let previousTime = performance.now()

		const tick = (time: number) => {
			const elapsed = Math.min(time - previousTime, 48)
			previousTime = time
			if (!reducedMotion.matches && !pausedRef.current) {
				const loopPoint = scroller.scrollWidth / 2
				scrollPositionRef.current = advanceMarqueePosition(scrollPositionRef.current, elapsed, loopPoint)
				scroller.scrollLeft = scrollPositionRef.current
			}
			frame = window.requestAnimationFrame(tick)
		}

		frame = window.requestAnimationFrame(tick)
		return () => window.cancelAnimationFrame(frame)
	}, [])

	const pause = () => {
		pausedRef.current = true
		if (scrollerRef.current) scrollPositionRef.current = scrollerRef.current.scrollLeft
	}
	const resume = () => {
		if (scrollerRef.current) scrollPositionRef.current = scrollerRef.current.scrollLeft
		pausedRef.current = false
	}

	return (
		<div
			ref={scrollerRef}
			className={styles.scroller}
			data-autoscroll="slow"
			tabIndex={0}
			role="region"
			aria-label="Customer reviews. This row moves slowly and can be scrolled manually."
			onMouseEnter={pause}
			onMouseLeave={resume}
			onFocus={pause}
			onBlur={resume}
			onPointerDown={pause}
			onPointerUp={resume}
			onPointerCancel={resume}
		>
			<div className={styles.track}>
				<ReviewCards />
				<ReviewCards duplicate />
			</div>
		</div>
	)
}
