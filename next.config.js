const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	// hmr: false,
	images: {
		domains: ["192.168.2.179", "localhost", "rabbitworld.ddns.net"],
		formats: ['image/avif', 'image/webp'],
	},
	env: {
		BASE_SERVER: process.env.BASE_SERVER || "https://rabbitworld.ddns.net"
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.plugins.push(new DuplicatePackageCheckerPlugin())
		config.optimization.minimizer.push(
			new OptimizeCSSAssetsPlugin({})
		);
		// config.plugins.push(
		// 	new BundleAnalyzerPlugin({
		// 		analyzerMode: 'server',
		// 		analyzerPort: isServer ? 8888 : 8889,
		// 		openAnalyzer: true,
		// 	})
		// )
		return config
	},
}
