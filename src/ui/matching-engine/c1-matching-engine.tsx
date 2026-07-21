'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { LuArrowLeft, LuCheck, LuLockKeyhole, LuShieldCheck } from 'react-icons/lu'

import type { LeadAttribution } from '@/lib/business-finance-lead'

import styles from './c1-matching-engine.module.css'
import {
	buildJourney,
	getNextStepId,
	getPreviousStepId,
	getProgress,
	type MatchingAnswers,
	type StepId,
} from './model'
import { choiceQuestions, fieldQuestionTitles } from './questions'

const STORAGE_KEY = 'comparison-one-matching-engine'

const answerKeysByPurpose = {
	new_vehicle: ['vehicle_type', 'vehicle_found'],
	new_equipment: ['equipment_type', 'equipment_found'],
} as const

function formatCurrency(value = '') {
	const digits = value.replace(/\D/g, '')
	if (!digits) return ''
	return `$${new Intl.NumberFormat('en-AU').format(Number(digits))}`
}

function cleanAnswersForSelection(
	currentStepId: StepId,
	answers: MatchingAnswers,
	value: string,
): MatchingAnswers {
	const next = { ...answers, [currentStepId]: value }

	if (currentStepId === 'purpose') {
		for (const fields of Object.values(answerKeysByPurpose)) {
			for (const field of fields) delete next[field]
		}
		delete next.asset_purchase_source
		delete next.finance_full_purchase
	}

	if ((currentStepId === 'vehicle_found' || currentStepId === 'equipment_found') && value === 'no') {
		delete next.asset_purchase_source
		delete next.finance_full_purchase
	}

	if (currentStepId === 'tax_debt' && value === 'no') delete next.tax_debt_amount

	return next
}

function FieldError({ message }: { message?: string }) {
	if (!message) return null
	return (
		<p className={styles.fieldError} role="alert">
			{message}
		</p>
	)
}

export default function C1MatchingEngine() {
	const [answers, setAnswers] = useState<MatchingAnswers>({})
	const [currentStepId, setCurrentStepId] = useState<StepId>('purpose')
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [attribution, setAttribution] = useState<LeadAttribution>({})
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
	const [submitMessage, setSubmitMessage] = useState('')
	const headingRef = useRef<HTMLHeadingElement>(null)
	const submissionIdRef = useRef('')
	const choiceQuestion = choiceQuestions[currentStepId]
	const fieldQuestion = fieldQuestionTitles[currentStepId]
	const journey = useMemo(() => buildJourney(answers), [answers])
	const progress = getProgress(currentStepId, answers)
	const previousStepId = getPreviousStepId(currentStepId, answers)

	useEffect(() => {
		try {
			const stored = window.sessionStorage.getItem(STORAGE_KEY)
			if (stored) {
				const parsed = JSON.parse(stored) as { answers?: MatchingAnswers; currentStepId?: StepId }
				if (parsed.answers) setAnswers(parsed.answers)
				if (parsed.currentStepId && buildJourney(parsed.answers ?? {}).includes(parsed.currentStepId)) {
					setCurrentStepId(parsed.currentStepId)
				}
			}
		} catch {
			window.sessionStorage.removeItem(STORAGE_KEY)
		}

		const params = new URLSearchParams(window.location.search)
		setAttribution({
			landingPageUrl: window.location.href,
			referringUrl: document.referrer || undefined,
			utmSource: params.get('utm_source') || undefined,
			utmMedium: params.get('utm_medium') || undefined,
			utmCampaign: params.get('utm_campaign') || undefined,
			utmContent: params.get('utm_content') || undefined,
			utmTerm: params.get('utm_term') || undefined,
			gclid: params.get('gclid') || undefined,
			fbclid: params.get('fbclid') || undefined,
		})
	}, [])

	useEffect(() => {
		window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentStepId }))
	}, [answers, currentStepId])

	useEffect(() => {
		if (currentStepId !== 'purpose') headingRef.current?.focus()
	}, [currentStepId])

	function moveTo(stepId: StepId) {
		setIsTransitioning(true)
		window.setTimeout(() => {
			setCurrentStepId(stepId)
			setErrors({})
			setIsTransitioning(false)
		}, 150)
	}

	function selectChoice(value: string) {
		if (isTransitioning) return
		const nextAnswers = cleanAnswersForSelection(currentStepId, answers, value)
		setAnswers(nextAnswers)
		setErrors({})

		const nextStepId = getNextStepId(currentStepId, nextAnswers)
		if (nextStepId) moveTo(nextStepId)
	}

	function updateAnswer(key: string, value: string) {
		setAnswers((current) => ({ ...current, [key]: value }))
		setErrors((current) => {
			if (!current[key]) return current
			const next = { ...current }
			delete next[key]
			return next
		})
	}

	function validateCurrentStep() {
		const nextErrors: Record<string, string> = {}

		if (currentStepId === 'amount' || currentStepId === 'tax_debt_amount') {
			if (!answers[currentStepId] || Number(answers[currentStepId]) <= 0) {
				nextErrors[currentStepId] = 'Enter an amount greater than $0'
			}
		}

		if (currentStepId === 'business_details') {
			if (!answers.business_name?.trim()) nextErrors.business_name = 'Enter the registered business name'
			if (!/^\d{11}$/.test(answers.abn?.replace(/\s/g, '') ?? '')) {
				nextErrors.abn = 'Enter an 11-digit ABN'
			}
		}

		if (currentStepId === 'contact') {
			if (!answers.first_name?.trim()) nextErrors.first_name = 'Enter your first name'
			if (!answers.last_name?.trim()) nextErrors.last_name = 'Enter your last name'
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email ?? '')) {
				nextErrors.email = 'Enter a valid email address'
			}
			const normalizedPhone = answers.phone?.replace(/[\s()-]/g, '') ?? ''
			if (!/^(?:\+?61|0)[2-478]\d{8}$/.test(normalizedPhone)) {
				nextErrors.phone = 'Enter a valid Australian phone number'
			}
		}

		if (currentStepId === 'consent' && answers.consent !== 'yes') {
			nextErrors.consent = 'Confirm your consent to continue'
		}

		setErrors(nextErrors)
		return Object.keys(nextErrors).length === 0
	}

	async function submitLead() {
		setSubmitState('sending')
		setSubmitMessage('')
		if (!submissionIdRef.current) submissionIdRef.current = crypto.randomUUID()

		try {
			const response = await fetch('/api/business-finance-lead', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Idempotency-Key': submissionIdRef.current,
				},
				body: JSON.stringify({ answers, attribution }),
			})
			const result = (await response.json()) as {
				ok?: boolean
				message?: string
				errors?: Record<string, string>
			}

			if (!response.ok || !result.ok) {
				if (result.errors) setErrors(result.errors)
				throw new Error(result.message || 'We could not submit your details. Please try again.')
			}

			window.sessionStorage.removeItem(STORAGE_KEY)
			setSubmitState('success')
		} catch (error) {
			setSubmitState('error')
			setSubmitMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
		}
	}

	function handleContinue(event?: FormEvent) {
		event?.preventDefault()
		if (!validateCurrentStep()) return
		const nextStepId = getNextStepId(currentStepId, answers)
		if (nextStepId) moveTo(nextStepId)
		else void submitLead()
	}

	function goBack() {
		if (previousStepId) moveTo(previousStepId)
	}

	function renderChoiceQuestion() {
		if (!choiceQuestion) return null
		const includesIcons = choiceQuestion.options.some((option) => option.icon)
		const isStateGrid = currentStepId === 'state'

		return (
			<div
				className={`${styles.choiceGrid} ${styles[`columns${choiceQuestion.columns}`]} ${
					includesIcons ? styles.iconGrid : styles.textGrid
				} ${isStateGrid ? styles.stateGrid : ''}`}
				role="radiogroup"
				aria-labelledby="matching-question-title"
			>
				{choiceQuestion.options.map((option) => {
					const Icon = option.icon
					const selected = answers[currentStepId] === option.value
					return (
						<button
							key={option.value}
							type="button"
							className={`${styles.choiceCard} ${selected ? styles.selectedChoice : ''}`}
							role="radio"
							aria-checked={selected}
							onClick={() => selectChoice(option.value)}
						>
							{Icon ? <Icon className={styles.choiceIcon} aria-hidden="true" /> : null}
							{isStateGrid && option.statePath ? (
								<svg className={styles.stateSilhouette} viewBox="0 0 32 32" aria-hidden="true">
									<path d={option.statePath} />
								</svg>
							) : null}
							<span>{option.label}</span>
							{selected ? <LuCheck className={styles.selectionCheck} aria-hidden="true" /> : null}
						</button>
					)
				})}
			</div>
		)
	}

	function renderFieldQuestion() {
		if (currentStepId === 'amount' || currentStepId === 'tax_debt_amount') {
			return (
				<div className={styles.amountField}>
					<label htmlFor={currentStepId}>Amount</label>
					<input
						id={currentStepId}
						autoFocus
						inputMode="numeric"
						autoComplete="off"
						value={formatCurrency(answers[currentStepId])}
						onChange={(event) => updateAnswer(currentStepId, event.target.value.replace(/\D/g, ''))}
						placeholder="$50,000"
						aria-invalid={Boolean(errors[currentStepId])}
					/>
					<FieldError message={errors[currentStepId]} />
				</div>
			)
		}

		if (currentStepId === 'business_details') {
			return (
				<div className={styles.fieldStack}>
					<label>
						<span>Registered business name</span>
						<input
							autoFocus
							autoComplete="organization"
							value={answers.business_name ?? ''}
							onChange={(event) => updateAnswer('business_name', event.target.value)}
							aria-invalid={Boolean(errors.business_name)}
						/>
						<FieldError message={errors.business_name} />
					</label>
					<label>
						<span>ABN</span>
						<input
							inputMode="numeric"
							autoComplete="off"
							value={answers.abn ?? ''}
							onChange={(event) => updateAnswer('abn', event.target.value.replace(/[^\d\s]/g, ''))}
							placeholder="11 digits"
							aria-invalid={Boolean(errors.abn)}
						/>
						<FieldError message={errors.abn} />
					</label>
				</div>
			)
		}

		if (currentStepId === 'contact') {
			return (
				<div className={styles.fieldStack}>
					<div className={styles.splitFields}>
						<label>
							<span>First name</span>
							<input
								autoFocus
								autoComplete="given-name"
								value={answers.first_name ?? ''}
								onChange={(event) => updateAnswer('first_name', event.target.value)}
								aria-invalid={Boolean(errors.first_name)}
							/>
							<FieldError message={errors.first_name} />
						</label>
						<label>
							<span>Last name</span>
							<input
								autoComplete="family-name"
								value={answers.last_name ?? ''}
								onChange={(event) => updateAnswer('last_name', event.target.value)}
								aria-invalid={Boolean(errors.last_name)}
							/>
							<FieldError message={errors.last_name} />
						</label>
					</div>
					<label>
						<span>Email address</span>
						<input
							type="email"
							autoComplete="email"
							value={answers.email ?? ''}
							onChange={(event) => updateAnswer('email', event.target.value)}
							aria-invalid={Boolean(errors.email)}
						/>
						<FieldError message={errors.email} />
					</label>
					<label>
						<span>Mobile number</span>
						<input
							type="tel"
							autoComplete="tel"
							value={answers.phone ?? ''}
							onChange={(event) => updateAnswer('phone', event.target.value)}
							placeholder="04xx xxx xxx"
							aria-invalid={Boolean(errors.phone)}
						/>
						<FieldError message={errors.phone} />
					</label>
				</div>
			)
		}

		if (currentStepId === 'consent') {
			return (
				<div className={styles.consentPanel}>
					<div className={styles.summaryRows}>
						<div><span>Funding amount</span><strong>{formatCurrency(answers.amount)}</strong></div>
						<div><span>Business</span><strong>{answers.business_name}</strong></div>
						<div><span>Contact</span><strong>{answers.email}</strong></div>
					</div>
					<label className={styles.consentCheck}>
						<input
							type="checkbox"
							checked={answers.consent === 'yes'}
							onChange={(event) => updateAnswer('consent', event.target.checked ? 'yes' : 'no')}
						/>
						<span>
							I agree that Comparison One may use these details to identify and contact me about relevant
							business-finance options. Approval is not guaranteed.
						</span>
					</label>
					<FieldError message={errors.consent} />
					{submitState === 'error' ? <p className={styles.submitError}>{submitMessage}</p> : null}
				</div>
			)
		}

		return null
	}

	if (submitState === 'success') {
		return (
			<div className={styles.pageShell}>
				<section className={`${styles.card} ${styles.successCard}`} aria-labelledby="success-title">
					<div className={styles.successIcon}><LuCheck aria-hidden="true" /></div>
					<h1 id="success-title">Your details have been received</h1>
					<p>We’ll review the information and contact you about relevant business-finance pathways.</p>
					<p className={styles.disclaimer}>Comparison One is not a lender. Approval is not guaranteed.</p>
				</section>
			</div>
		)
	}

	const hasCurrentChoice = Boolean(choiceQuestion && answers[currentStepId])
	const isManualStep = !choiceQuestion

	return (
		<div className={styles.pageShell}>
			<div className={styles.ambientShape} aria-hidden="true" />
			<form className={styles.card} onSubmit={handleContinue} noValidate>
				{currentStepId !== 'purpose' ? (
					<div className={styles.progressTrack} aria-hidden="true">
						<div className={styles.progressFill} style={{ width: `${progress}%` }} />
					</div>
				) : null}

				<div className={`${styles.cardBody} ${isTransitioning ? styles.transitioning : ''}`}>
					{previousStepId ? (
						<button type="button" className={styles.backButton} onClick={goBack} aria-label="Go back">
							<LuArrowLeft aria-hidden="true" /> Back
						</button>
					) : null}

					<header className={styles.questionHeader} aria-live="polite">
						<h1 id="matching-question-title" ref={headingRef} tabIndex={-1}>
							{choiceQuestion?.title ?? fieldQuestion?.title}
						</h1>
						{choiceQuestion?.helper || fieldQuestion?.helper ? (
							<p>{choiceQuestion?.helper ?? fieldQuestion?.helper}</p>
						) : null}
					</header>

					{choiceQuestion ? renderChoiceQuestion() : renderFieldQuestion()}
				</div>

				<footer className={styles.cardFooter}>
					<button
						type="submit"
						className={styles.nextButton}
						disabled={choiceQuestion ? !hasCurrentChoice : submitState === 'sending'}
					>
						{submitState === 'sending'
							? 'Sending securely…'
							: currentStepId === 'consent'
								? 'See my options'
								: 'Next'}
					</button>
					{choiceQuestion ? <span className={styles.autoAdvanceText}>Choose an option to continue</span> : null}
				</footer>
			</form>

			<div className={styles.trustLine}>
				<span><LuLockKeyhole aria-hidden="true" /> Secure form</span>
				<span><LuShieldCheck aria-hidden="true" /> No impact on your credit score</span>
			</div>
			<span className={styles.stepCount} aria-label={`Step ${journey.indexOf(currentStepId) + 1} of ${journey.length}`}>
				Step {journey.indexOf(currentStepId) + 1} of {journey.length}
			</span>
		</div>
	)
}
