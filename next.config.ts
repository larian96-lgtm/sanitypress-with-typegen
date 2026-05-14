import type { NextConfig } from 'next'
import { groq } from 'next-sanity'
import { ROUTES } from './src/lib/env'
import { client } from './src/sanity/lib/client'

const nextConfig: NextConfig = {
	reactCompiler: true,

	images: {
		localPatterns: [{ pathname: '/api/og' }, { pathname: '/finview/**' }, { pathname: '/comparisonone/**' }],
		remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
	},

	async redirects() {
		const sanityRedirects = await client.fetch(
			groq`*[_type == 'redirect']{
				source,
				'destination': select(
					destination.type == 'internal' =>
						select(
							destination.internal->metadata.slug.current == 'index' =>
								'/',
							'/' + destination.internal->metadata.slug.current
						),
					destination.external
				),
				permanent
			}`,
		)

		return [
			{
				source: '/loan',
				destination: '/quiz',
				permanent: true,
			},
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'comparison-one-sanitypress.vercel.app' }],
				destination: 'https://www.comparisonone.com/:path*',
				permanent: true,
			},
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'comparisonone.com' }],
				destination: 'https://www.comparisonone.com/:path*',
				permanent: true,
			},
			...sanityRedirects,
		]
	},

	rewrites: () => ({
		beforeFiles: [
			{
				has: [{ type: 'host', value: 'admin.*' }],
				source: '/:path*',
				destination: '/admin/:path*',
			},
		],
	}),
}

export default nextConfig
