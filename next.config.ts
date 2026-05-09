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
		return await client.fetch(
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
