import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
	name: 'c1.rateTable',
	title: 'C1 Rate Table',
	type: 'document',
	icon: DocumentTextIcon,
	fields: [
		defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
		defineField({
			name: 'slug',
			type: 'slug',
			description: 'Use business-loans-rates for the default table',
			options: {source: 'title'},
			validation: (Rule) => Rule.required(),
		}),
		defineField({name: 'updatedAt', type: 'date', validation: (Rule) => Rule.required()}),
		defineField({
			name: 'methodologyNote',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'rows',
			type: 'array',
			of: [defineArrayMember({type: 'c1.lenderRateRow'})],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {title: 'title', subtitle: 'updatedAt'},
	},
})
