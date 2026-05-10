import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
	name: 'c1.contentPage',
	title: 'Comparison One Content Page',
	type: 'document',
	icon: DocumentTextIcon,
	groups: [
		{ name: 'content', default: true },
		{ name: 'seo', title: 'SEO / AEO' },
		{ name: 'review', title: 'Review' },
	],
	fields: [
		defineField({ name: 'title', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
		defineField({
			name: 'type',
			type: 'string',
			group: 'content',
			initialValue: 'finance',
			options: { list: ['finance', 'blog', 'lender', 'advertorial'] },
		}),
		defineField({
			name: 'path',
			title: 'Page path',
			type: 'string',
			description: 'Example: /business-loans/working-capital. This overrides the coded fallback page at the same path.',
			group: 'content',
			validation: (Rule) => Rule.required().regex(/^\//, { name: 'starts with /' }),
		}),
		defineField({ name: 'slug', type: 'slug', group: 'content', options: { source: 'title' } }),
		defineField({ name: 'eyebrow', type: 'string', group: 'content' }),
		defineField({ name: 'headline', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
		defineField({ name: 'summary', type: 'text', rows: 5, group: 'content', validation: (Rule) => Rule.required() }),
		defineField({ name: 'primaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'content', initialValue: 'Start my funding-fit check' }),
		defineField({ name: 'primaryCtaHref', title: 'Primary CTA href', type: 'string', group: 'content', initialValue: '/quiz' }),
		defineField({ name: 'proofPoints', title: 'Proof points', type: 'array', group: 'content', of: [defineArrayMember({ type: 'string' })] }),
		defineField({
			name: 'rateSnapshot',
			title: 'Rate Snapshot',
			type: 'array',
			description: 'Rate band cards shown at top of page (e.g. "Secured finance from 7.49%")',
			group: 'content',
			of: [defineArrayMember({ type: 'rateSnapshot' })],
		}),
		defineField({
			name: 'rateComparisonTable',
			title: 'Rate Comparison Table',
			type: 'rateComparisonTable',
			group: 'content',
			description: 'Configures the live filterable rate comparison widget on this page',
		}),
		defineField({
			name: 'sections',
			type: 'array',
			group: 'content',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'heading', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'body', type: 'text', rows: 8 }),
						defineField({ name: 'bullets', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
						defineField({
							name: 'table',
							title: 'Comparison table',
							type: 'object',
							description: 'Optional Finview-styled table rendered after this section. Keep headers and each row in the same column order.',
							fields: [
								defineField({
									name: 'headers',
									type: 'array',
									of: [defineArrayMember({ type: 'string' })],
									validation: (Rule) => Rule.min(1),
								}),
								defineField({
									name: 'rows',
									type: 'array',
									of: [
										defineArrayMember({
											type: 'object',
											fields: [
												defineField({
													name: 'cells',
													type: 'array',
													of: [defineArrayMember({ type: 'string' })],
													validation: (Rule) => Rule.min(1),
												}),
											],
											preview: { select: { title: 'cells.0' } },
										}),
									],
								}),
							],
						}),
					],
					preview: { select: { title: 'heading', subtitle: 'body' } },
				}),
			],
		}),
		defineField({
			name: 'faqs',
			title: 'FAQs',
			type: 'array',
			group: 'content',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'question', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'answer', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
					],
					preview: { select: { title: 'question', subtitle: 'answer' } },
				}),
			],
		}),
		defineField({
			name: 'relatedLinks',
			type: 'array',
			group: 'content',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'label', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'href', type: 'string', validation: (Rule) => Rule.required() }),
					],
					preview: { select: { title: 'label', subtitle: 'href' } },
				}),
			],
		}),
		defineField({ name: 'seoTitle', type: 'string', group: 'seo' }),
		defineField({ name: 'seoDescription', type: 'text', rows: 3, group: 'seo' }),
		defineField({ name: 'targetQuery', type: 'string', group: 'seo' }),
		defineField({ name: 'answerSummary', type: 'text', rows: 3, group: 'seo' }),
		defineField({ name: 'schemaType', type: 'string', group: 'seo', options: { list: ['Article', 'FAQPage', 'FinancialService'] } }),
		defineField({ name: 'lastReviewed', type: 'date', group: 'review', initialValue: () => new Date().toISOString().slice(0, 10) }),
		defineField({ name: 'authorTitle', type: 'string', group: 'review', initialValue: 'Comparison One SME Finance Editorial Team' }),
		defineField({ name: 'editorNote', type: 'text', rows: 3, group: 'review' }),
	],
	preview: {
		select: { title: 'title', subtitle: 'path' },
	},
})
