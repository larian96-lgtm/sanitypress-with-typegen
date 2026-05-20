import { StructureBuilder, structureTool } from 'sanity/structure'
import { VscServerProcess } from 'react-icons/vsc'
import { singleton } from './lib/builders'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export default structureTool({
	structure: (S: StructureBuilder) =>
		S.list()
			.title('Content')
			.items([
				S.divider().title('Global'),
				singleton(S, 'site').title('Site').icon(VscServerProcess),
				S.documentTypeListItem('global-module').title('Global modules'),

				S.divider().title('Comparison One'),
				singleton(S, 'c1.homepage').title('Homepage'),
				S.listItem()
					.title('Zero Interest Loan Scheme advertorial')
					.schemaType('c1.contentPage')
					.child(
						S.document()
							.schemaType('c1.contentPage')
							.documentId('c1.contentPage.zero-interest-loan-scheme')
							.initialValueTemplate('c1-zero-interest-advertorial')
							.title('Zero Interest Loan Scheme advertorial'),
					),
				S.documentTypeListItem('c1.contentPage').title('All Comparison One Pages'),
				S.documentTypeListItem('page').title('Pages'),

				S.divider().title('Blog'),
				S.documentTypeListItem('blog.post').title('Posts'),
				S.documentTypeListItem('blog.category').title('Categories'),

				S.divider().title('Navigation'),
				S.documentTypeListItem('navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),

				S.divider().title('References'),
				S.documentTypeListItem('form').title('Forms'),
				S.documentTypeListItem('logo').title('Logos'),
				S.documentTypeListItem('person').title('People'),
				S.documentTypeListItem('quote').title('Quotes'),
			]),
})
