var webpack = require("webpack")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

var devConfig = require("./webpack.config.js")
devConfig.devtool = "source-map"

const env = new webpack.DefinePlugin({
  "process.env": {
     NODE_ENV: JSON.stringify("production")
   }
})

devConfig.plugins.push(env)

var uglyfy = new UglifyJSPlugin()
devConfig.plugins.push(uglyfy)

module.exports = devConfig
