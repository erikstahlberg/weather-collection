"use strict"

const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")

const isDevServer = path.basename(require.main.filename) === "webpack-dev-server.js"

const withDevServerConfig = {
	cssFilename: "[name].style.css",
	outputFilename: "[name].bundle.js",
	chunkFilename: "[name].chunk.js"
}

/*const manifestOutputConfig = {
	cssFilename: "[name].[chunkhash].style.css",
	outputFilename: "[name].[chunkhash].bundle.js",
	chunkFilename: "[name].[chunkhash].js"
}
*/

//const localConfig = isDevServer ? withDevServerConfig : manifestOutputConfig
const localConfig = withDevServerConfig
const extractCSS = new ExtractTextPlugin(localConfig.cssFilename)

module.exports = {
	entry:
	{
		rassp: "./src/js/app.jsx",
	},
	devtool: "#eval-source-map",
	context: __dirname,
	output: {
		path: path.resolve(__dirname, "./deploy/content/static/js"),
		filename: localConfig.outputFilename,
		publicPath: "/static/js/",
		chunkFilename: localConfig.chunkFilename,
	},
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: true,
		timings: true,
		chunks: false,
		chunkModules: false
	},
	node: {
		fs: "empty"
	},
	externals: {
		"react/addons": true,
		"react/lib/ExecutionEnvironment": true,
		"react/lib/ReactContext": true,
	},

	devServer: {
		port: 8082,
		compress: true,
		publicPath: "/static/js/",
		contentBase: path.resolve(__dirname, "deploy/content"),
		historyApiFallback: true,
		clientLogLevel: "info",
		proxy: {
			"/ws": {
				target: "http://localhost:8081",
				ws: true,
			}
		}
		// host: '0.0.0.0',
  //       disableHostCheck: true
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /\.js[x]?$/,
				include: path.resolve(__dirname, "node_modules", "vidicore"),
				loader: "babel-loader",
			},
			{
				test: /\.css$/,
				loader: extractCSS.extract({
					use: "css-loader",
					fallback: "style-loader",
				})
			},
			{
				test: /\.less$/,
				loader: extractCSS.extract({
					use: ["css-loader", "less-loader"],
					fallback: "style-loader",
				})
			},
			
			{ test: /\.png$/, use: "file-loader" },
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					query: {
						limit: 65000,
						mimetype: "application/font-woff"
					}
				}
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					query: {
						limit:65000,
						mimetype: "application/octet-stream"
					},
				}
			},

			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: "url-loader"
			},

			/* special handling for bootstrap.. needs jquery */
			//{ test: /bootstrap\/js\//, loader: "imports?jQuery=jquery" },
		]
	},
	plugins: [
		extractCSS,
	]
}
