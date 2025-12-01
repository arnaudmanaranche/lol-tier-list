// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  transpilePackages: ['@lol-tier-list/shared', 'react-native-web', 'moti', 'nativewind'],
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    // Alias react-native to react-native-web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    }

    // Handle react-native-svg for web
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions
    ]

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
