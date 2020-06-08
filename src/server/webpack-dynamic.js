const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PackageWebpackPlugin = require('./package-webpack-plugin')
const glob = require('glob')

function getConfig(folderId, packageId, wsMap) {

  const HtmlWebpackPlugins = []

  function getEntry(globPath) {
    const files = glob.sync(globPath)
    const entryMap = {}
    files.forEach(entry => {
      const pathArr = entry.split('/')

      const fileName = pathArr[pathArr.length - 1].replace(/.js/g, '')
      entryMap[fileName] = ['@babel/polyfill', entry]

      HtmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          title: '页面生成平台',
          template: path.resolve(__dirname, './template.html'),
          filename: `${fileName}.html`,
          chunks: ['common', fileName]
        })
      )

    })

    return entryMap
  }

  const entries = getEntry(path.resolve(__dirname, `./page-file/${folderId}/*.js`))

  const config = {
    mode: 'production',
    entry: entries,
    output: {
      path: path.resolve(__dirname, `./build-page/${folderId}`),
      publicPath: './',
      filename: 'static/js/[name].[contenthash].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'common',
            chunks: 'initial',
            priority: 2,
            minChunks: 2,
          },
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
      },
      extensions: [".js", ".json"]
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
                name: './static/assets/images/[name].[hash].[ext]'
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
      ...HtmlWebpackPlugins,
      new PackageWebpackPlugin({
        packageId,
        wsMap
      }),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash].css",
        chunkFilename: "[id].css"
      })
    ]
  }

  return config
}

module.exports = getConfig
