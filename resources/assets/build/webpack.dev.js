'use strict'
const path = require('path')
const webpack = require('webpack')
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.devtool = 'cheap-module-eval-source-map'
webpack_base.output.publicPath = 'http://localhost:' + config.port + config.assets_url
webpack_base.output.path = '/tmp/'
for (var name in webpack_base.entry) {
  webpack_base.entry[name] = [path.resolve(__dirname, './server-client'), ...webpack_base.entry[name]]
}
webpack_base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

module.exports = webpack_base
