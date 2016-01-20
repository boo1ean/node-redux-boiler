var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		path.resolve(__dirname, '../frontend')
	],
	output: {
		path: path.join(__dirname, '../assets/dist'),
		publicPath: '/dist/',
		filename: 'bundle.js',
		chunkFilename: '[name]-[chunkhash].js',
	},
	plugins: [
		new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: 'production'
			}
		}),

		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
	],
	module: {
		loaders: [
			{ test: /\.eot$/,  loader: "file-loader" },
			{ test: /\.woff2?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
			{ test: /\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
			{ test: /\.css$/, loaders: ['style', 'css'] },
			{ test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
		]
	},
	progress: true
};
