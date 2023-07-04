/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  transpilePackages: ['@prodigy/ui'],
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

module.exports = moduleExports
