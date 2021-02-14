import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const nodeExternals = require('webpack-node-externals')

//const path = require('path')

const {
	NODE_ENV = 'production',
} = process.env

export default {
	entry: './src/main.ts',
	devtool: 'source-map',
	mode: NODE_ENV,
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{ test: /\.tsx?$/, loader: 'ts-loader' },
      
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ test: /\.js$/, loader: 'source-map-loader' },
		],
	},
	target: 'node',
	output: {
		filename: './main.js',
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
	},
	externals: [nodeExternals()]
}