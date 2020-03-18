const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(`envirmonent: ${process.env.NODE_ENV}`)

const config = {
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/page-builder/',
    filename: 'static/js/[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {}
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/assets/images/[name].[hash].[ext]'
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '页面生成平台',
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}

module.exports = config
