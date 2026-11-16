import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  async redirects() {
    return [
      {
        source: '/series/from-kotlin-to-dotnet-backend',
        destination: '/series/from-domain-to-production',
        permanent: true,
      },
      {
        source: '/articles/from-kotlin-to-dotnet-backend-01-entities',
        destination: '/articles/ddd-entity-value-object-aggregate-root',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/articles/*': ['./src/app/articles/**/*.mdx'],
    },
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
