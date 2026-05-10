import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export default defineType({
	name: 'rateSnapshot',
	title: 'Rate Snapshot',
	type: 'object',
	icon: PlayIcon,
	fields: [
		defineField({
			name: 'label',
			type: 'string',
			description: 'Category label, e.g. "Secured finance from"',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'rate',
			type: 'string',
			description: 'Rate display value, e.g. "7.49%" or "from 2.5%"',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'sublabel',
			type: 'string',
			description: 'Small note under the rate, e.g. "Per annum" or "Of invoice amount"',
		}),
		defineField({
			name: 'linkHref',
			type: 'string',
			description: 'Optional link to relevant subpage, e.g. /business-loans/equipment-finance',
		}),
		defineField({
			name: 'linkLabel',
			type: 'string',
			description: 'CTA text for the optional link',
		}),
	],
	preview: {
		select: {title: 'label', subtitle: 'rate'},
	},
})
