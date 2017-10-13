'use strict'
const webpack = require('webpack')
const ExtractCSSPlugin = require('./extractCSSPlugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.devtool = false
webpack_base.output.filename = '[name].[chunkhash:8].js'
webpack_base.plugins.push(
  new ProgressBarPlugin(),
  new ExtractCSSPlugin('[name].[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
  new AssetsPlugin({filename: config.assets_path + 'assets.json'})
)

// VueJS extract
let vuePlugin = webpack_base.plugins[0].options.options.vue
vuePlugin.loaders.scss = ExtractCSSPlugin.extract({
  loader: ['css-loader', 'postcss-loader', 'sass-loader']
})

// Extract SCSS / CSS
webpack_base.module.rules.forEach(function (rule, k) {
  if (
    ".scss".match(rule.test) ||
    ".css".match(rule.test)
  ) {
    rule.loader.shift()
    webpack_base.module.rules[k].loader = ExtractCSSPlugin.extract({
      loader: rule.loader
    })
  }
})

module.exports = webpack_base
