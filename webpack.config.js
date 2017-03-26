const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: '../index.html',
	inject: 'body'
});

module.exports = {
	entry: {
		main: './src/js/index.js',
	},
	output: {
		path: path.resolve('./dist'),
		filename: 'js/app.js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			}
		]
	},
	plugins: [HtmlWebpackPluginConfig],
	resolve: {
		alias: {},
	},
};