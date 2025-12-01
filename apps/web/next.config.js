// @ts-check
const path = require('path')
const webpack = require('webpack')

/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  transpilePackages: [
    '@lol-tier-list/shared',
    'react-native',
    'react-native-web',
    'react-native-svg',
    'react-native-reanimated',
    'moti'
  ],
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    // Define __DEV__ for React Native packages
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(dev)
      })
    )

    // Ensure single instances of React and alias react-native
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Prevent duplicate React instances from shared package
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      // Alias react-native to react-native-web
      'react-native$': 'react-native-web',
      'react-native': 'react-native-web'
    }

    // Prioritize .web.js extensions
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
