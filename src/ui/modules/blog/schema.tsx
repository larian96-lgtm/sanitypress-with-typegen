import { ROUTES } from '@/lib/env'
import { getBlockText } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { BLOG_POST_QUERY_RESULT } from '@/sanity/types'

export default function BlogPostSchema({
	post,
}: {
	post: BLOG_POST_QUERY_RESULT
}) {
	if (!post?.metadata) return null

	const { slug, image } = post.metadata

	const author = post.author as any
	const categories = post.categories as any[] | undefined

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title || post.metadata.title || '',
		description: post.metadata.description || '',
		datePublished: post.publishDate || undefined,
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.blog}/${slug?.current}`,
		image: image
			? urlFor(image).width(1200).url()
			: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${ROUTES.blog}/${slug?.current}`,
		keywords:
			categories?.map((category) => category?.title).filter(Boolean).join(', ') ||
			undefined,
		articleBody: post.contentPlainText ?? undefined,
		...(author && {
			author: {
				'@type': 'Person',
				name: author.name || 'No author',
				...(author.image && {
					image: urlFor(author.image).width(200).url(),
				}),
			},
		}),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}
