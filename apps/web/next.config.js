// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co`
      }
    ]
  }
}

module.exports = moduleExports
