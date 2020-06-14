const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const config = require('../src/client/config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:9000/page-builder/home' }),
    new webpack.DefinePlugin({
      'REQUEST_URL': JSON.stringify(config.dev.host),
      'WS_URL': JSON.stringify(config.dev.wsHost)
    })
  ]
})
