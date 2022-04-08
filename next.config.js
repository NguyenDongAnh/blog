const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["192.168.2.179", "localhost"],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    BASE_SERVER: process.env.BASE_SERVER || "https://rabbitworld.ddns.net"
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new DuplicatePackageCheckerPlugin())
    if (true) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      )
    }
    return config
  },
}
