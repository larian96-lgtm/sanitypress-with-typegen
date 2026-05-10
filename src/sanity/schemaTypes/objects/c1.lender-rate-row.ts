import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

const productTypeOptions = [
	{title: 'Secured', value: 'secured'},
	{title: 'Unsecured', value: 'unsecured'},
	{title: 'Line of Credit', value: 'lineOfCredit'},
	{title: 'Equipment', value: 'equipment'},
	{title: 'Invoice', value: 'invoice'},
	{title: 'Vehicle', value: 'vehicle'},
	{title: 'Working Capital', value: 'workingCapital'},
]

const securityTypeOptions = [
	{title: 'Secured', value: 'secured'},
	{title: 'Unsecured', value: 'unsecured'},
	{title: 'Asset-backed', value: 'asset-backed'},
]

export default defineType({
	name: 'c1.lenderRateRow',
	title: 'C1 Lender Rate Row',
	type: 'object',
	icon: TagIcon,
	fields: [
		defineField({name: 'lenderSlug', type: 'string', validation: (Rule) => Rule.required()}),
		defineField({name: 'lenderName', type: 'string', validation: (Rule) => Rule.required()}),
		defineField({name: 'productName', type: 'string', validation: (Rule) => Rule.required()}),
		defineField({
			name: 'productType',
			type: 'string',
			options: {list: productTypeOptions},
			validation: (Rule) => Rule.required(),
		}),
		defineField({name: 'rateFrom', type: 'number', validation: (Rule) => Rule.required().min(0)}),
		defineField({name: 'rateTo', type: 'number', validation: (Rule) => Rule.min(0)}),
		defineField({name: 'comparisonRate', type: 'number', validation: (Rule) => Rule.min(0)}),
		defineField({name: 'minAmount', type: 'number', validation: (Rule) => Rule.required().min(0)}),
		defineField({name: 'maxAmount', type: 'number', validation: (Rule) => Rule.required().min(0)}),
		defineField({name: 'minTermMonths', type: 'number', validation: (Rule) => Rule.required().min(1)}),
		defineField({name: 'maxTermMonths', type: 'number', validation: (Rule) => Rule.required().min(1)}),
		defineField({name: 'fundingSpeed', type: 'string', validation: (Rule) => Rule.required()}),
		defineField({
			name: 'securityType',
			type: 'string',
			options: {list: securityTypeOptions},
			validation: (Rule) => Rule.required(),
		}),
		defineField({name: 'bestFor', type: 'string'}),
		defineField({name: 'updatedAt', type: 'date', validation: (Rule) => Rule.required()}),
		defineField({name: 'isActive', type: 'boolean', initialValue: true}),
	],
	preview: {
		select: {
			title: 'lenderName',
			subtitle: 'productName',
			rateFrom: 'rateFrom',
			rateTo: 'rateTo',
		},
		prepare(selection) {
			const {title, subtitle, rateFrom, rateTo} = selection as {
				title?: string
				subtitle?: string
				rateFrom?: number
				rateTo?: number
			}
			const rateLabel = rateTo ? `${rateFrom}% - ${rateTo}%` : `${rateFrom}%`
			return {title: title || 'Rate row', subtitle: `${subtitle || ''} • ${rateLabel}`}
		},
	},
})
