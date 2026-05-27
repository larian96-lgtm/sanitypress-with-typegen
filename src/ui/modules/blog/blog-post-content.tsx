import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type {
	BLOG_POST_QUERY_RESULT,
	BlogCategory,
	BlogPostContent,
	Person,
} from '@/sanity/types'
import Img from '@/ui/img'
import CustomHTML from '@/ui/modules/custom-html'
import AnchoredHeading from '@/ui/modules/prose/anchored-heading'
import Code from '@/ui/modules/prose/code'
import Image from '@/ui/modules/prose/image'
import TableOfContents from '@/ui/table-of-contents'
import { moduleAttributes } from '..'
import css from './blog-post-content.module.css'
import Byline from './byline'
import Categories from './categories'
import Date from './date'
import Schema from './schema'

const headingComponents = {
	h1: (node: any) => <AnchoredHeading as="h1" {...node} />,
	h2: (node: any) => <AnchoredHeading as="h2" {...node} />,
	h3: (node: any) => <AnchoredHeading as="h3" {...node} />,
	h4: (node: any) => <AnchoredHeading as="h4" {...node} />,
	h5: (node: any) => <AnchoredHeading as="h5" {...node} />,
	h6: (node: any) => <AnchoredHeading as="h6" {...node} />,
}

export default function ({
	post,
	tableOfContents,
	...props
}: { post: BLOG_POST_QUERY_RESULT } & BlogPostContent) {
	if (!post) return null

	const toc = stegaClean(tableOfContents)

	return (
		<>
			<article {...moduleAttributes(props)}>
				<header className="section relative text-center">
					<Img
						image={post.metadata?.image}
						imageOptions={{ blur: 30 }}
						width={1000}
						className="absolute inset-0 size-full object-cover opacity-10 delay-1000 duration-2000 starting:opacity-0"
						alt={post.metadata?.title ?? ''}
						draggable={false}
						loading="eager"
					/>

					<div className="relative mx-auto max-w-5xl space-y-4">
						<h1 className="h1 text-balance">
							{post.title || post.metadata?.title}
						</h1>

						<div className="gap-x-lh gap-y-ch flex flex-wrap items-center justify-center">
							<Byline author={post.author as unknown as Person} />
							<Categories
								categories={post.categories as unknown as BlogCategory[]}
								linked
							/>
							<Date date={post.publishDate} />
							<span>{Math.ceil(post.readTime)} min read</span>
						</div>
					</div>
				</header>

				<section className="section gap-lh flex max-md:flex-col md:items-start">
					{(toc === 'left' || toc === 'right') && (
						<TableOfContents
							summary="On this page"
							headings={post.headings}
							className={cn(
								'md:sticky-below-header max-md:p-ch max-md:bg-stroke/50 shrink-0 [--offset:1rem] md:w-[20ch]',
								toc === 'right' && 'md:order-last',
							)}
							open
						/>
					)}

					<div className="mx-auto w-full max-w-5xl rounded-[2rem] bg-white p-6 shadow-[0px_6px_30px_0px_rgba(0,0,0,0.04)] md:p-10 lg:p-12">
						<div className={cn(css.body, 'prose prose-lg mx-auto grid w-full max-w-4xl md:prose-xl')}>
							<PortableText
								value={post.content ?? []}
								components={{
									block: headingComponents,
									types: {
										image: Image,
										code: Code,
										'custom-html': ({ value }) => (
											<CustomHTML {...value} className="my-6" />
										),
									},
								}}
							/>
						</div>
						<div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#E4ECE8] bg-[#F5F6F7] p-6 text-sm leading-relaxed text-[#404A60]">
							<h2 className="mb-3 text-lg font-bold text-[#222E48]">How this article is reviewed</h2>
							<p>Comparison One articles are reviewed for clarity, source quality, finance-fit logic, current lender context and claims that could imply guaranteed approval. Rates, limits, fees and eligibility can change without notice.</p>
						</div>
					</div>
				</section>
			</article>

			<Schema post={post} />
		</>
	)
}
