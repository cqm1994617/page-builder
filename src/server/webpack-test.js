const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

const HtmlWebpackPlugins = []

function getEntry(globPath) {
  const files = glob.sync(globPath)
  const entryMap = {}
  files.forEach(entry => {
    const pathArr = entry.split('/')
    console.log(1, pathArr)
    const fileName = pathArr[pathArr.length - 1].replace(/.js/g, '')
    entryMap[fileName] = ['@babel/polyfill', entry]

    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: '页面生成平台',
        template: path.resolve(__dirname, './template.html')
      })
    )

  })
  return entryMap
}

const entries = getEntry(path.resolve(__dirname, `./page-file/3315c602-6b9e-4729-aa69-c4c21f03b260/*.js`))

console.log(24, entries)

const config = {
  mode: 'production',
  // entry: ['@babel/polyfill', path.resolve(__dirname, './page-file.js')],
  entry: entries,
  output: {
    path: path.resolve(__dirname, './build-page'),
    publicPath: './',
    filename: 'static/js/[name].[contenthash].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src'),
    },
    extensions: [".js", ".json"]
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
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
      },
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
    // new HtmlWebpackPlugin({
    //   title: '页面生成平台',
    //   template: path.resolve(__dirname, './template.html')
    // }),
    ...HtmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "[id].css"
    })
  ]
}


module.exports = config
