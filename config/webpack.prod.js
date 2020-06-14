const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('../src/client/config')
const webpack = require('webpack')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: '/page-builder/'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      REQUEST_URL: JSON.stringify(config.production.host),
      WS_URL: JSON.stringify(config.production.wsHost)
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new BundleAnalyzerPlugin()
  ]
})
