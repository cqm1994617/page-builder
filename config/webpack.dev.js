const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
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
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:9000' })
  ]
})
