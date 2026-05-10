import {defineField, defineType} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

export default defineType({
	name: 'rateComparisonTable',
	title: 'Rate Comparison Table',
	type: 'object',
	icon: StackCompactIcon,
	fields: [
		defineField({
			name: 'headline',
			type: 'string',
			description: 'Optional heading above the table',
		}),
		defineField({
			name: 'updatedAt',
			type: 'date',
			description: 'When rates were last refreshed',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'rateTableSlug',
			type: 'string',
			description: 'Defaults to business-loans-rates when empty',
			initialValue: 'business-loans-rates',
		}),
		defineField({
			name: 'showFilters',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			name: 'sortable',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			name: 'defaultProductTypes',
			type: 'array',
			of: [{type: 'string'}],
			description: 'Optional list like secured, unsecured, invoice, equipment',
		}),
		defineField({
			name: 'defaultLenderSlug',
			type: 'string',
			description: 'Optional pre-filtered lender (e.g. prospa)',
		}),
		defineField({
			name: 'methodologyNote',
			type: 'text',
			rows: 3,
			description: 'Small disclaimer shown below the table',
		}),
	],
	preview: {
		select: {title: 'headline', subtitle: 'updatedAt'},
	},
})
