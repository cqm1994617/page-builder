const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')


function getEntry(globPath) {
  const files = glob.sync(globPath)
  const entryMap = {}
  console.log(files)
  files.forEach(entry => {
    const pathArr = entry.split('/')

    const fileName = pathArr[pathArr.length - 3].replace(/.js/g, '')
    console.log(fileName)
    entryMap[fileName] = ['@babel/polyfill', entry]
  })

  return entryMap
}

const entries = getEntry(path.resolve(__dirname, `../src/component-list/**/server/index.js`))

console.log(entries)
const config = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, `../src/server/preview-page/package`),
    publicPath: './',
    filename: "MyComponent.[name].js",
    libraryTarget: 'umd',
    library: ['MyComponent', "[name]"]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: [".js", ".json"]
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css"
    })
  ]
}

module.exports = config
