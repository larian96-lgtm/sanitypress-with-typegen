import type { SchemaPluginOptions } from 'sanity'
// documents
import blogCategory from './documents/blog.category'
import blogPost from './documents/blog.post'
import c1Homepage from './documents/c1.homepage'
import c1ContentPage from './documents/c1.content-page'
import form from './documents/form'
import globalModule from './documents/global-module'
import logo from './documents/logo'
import navigation from './documents/navigation'
import page from './documents/page'
import person from './documents/person'
import quote from './documents/quote'
import redirect from './documents/redirect'
import site from './documents/site'
// modules
import accordionList from './modules/accordion-list'
import blogIndex from './modules/blog-index'
import blogPostContent from './modules/blog-post-content'
import blogPostList from './modules/blog-post-list'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import cardList from './modules/card-list'
import customHtml from './modules/custom-html'
import formModule from './modules/form-module'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import personList from './modules/person-list'
import prose from './modules/prose'
import quoteList from './modules/quote-list'
import searchModule from './modules/search-module'
import statList from './modules/stat-list'
import stepList from './modules/step-list'
// objects
import cta from './objects/cta'
import link from './objects/link'
import linkList from './objects/link.list'
import megamenu from './objects/megamenu'
import metadata from './objects/metadata'
import moduleAttributes from './objects/module-attributes'
import rateSnapshot from './objects/rate-snapshot'
import rateComparisonTable from './objects/rate-comparison-table'

export const schema: SchemaPluginOptions = {
	types: [
		// documents
		site,
		page,
		c1Homepage,
		c1ContentPage,
		form,
		globalModule,
		blogPost,
		redirect,

		// references
		blogCategory,
		logo,
		navigation,
		person,
		quote,

		// objects
		cta,
		link,
		linkList,
		megamenu,
		metadata,
		moduleAttributes,
		rateSnapshot,
		rateComparisonTable,

		// modules
		accordionList,
		blogIndex,
		blogPostContent,
		blogPostList,
		breadcrumbs,
		callout,
		cardList,
		customHtml,
		formModule,
		heroSplit,
		logoList,
		personList,
		prose,
		quoteList,
		searchModule,
		statList,
		stepList,
	],

	templates: (templates) =>
		templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
}

const singletonTypes = ['site', 'c1.homepage']
