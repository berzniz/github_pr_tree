const webpack = require('webpack')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { NODE_ENV, TARGET } = require('./utils/env')

const copyWebpackPlugins = [
  { from: './src/icons' },
  { from: './src/pages/options.css' }
]

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
  mode: NODE_ENV,
  devtool: false,
  entry: {
    better_github_prs: path.join(__dirname, 'src', 'js', 'index.jsx'),
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    options: path.join(__dirname, 'src', 'js', 'options.jsx')
  },
  output: {
    path: path.join(__dirname, 'build', TARGET, NODE_ENV),
    publicPath: ASSET_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff2)$/,
        use: ['file-loader?name=/fonts/[name].[ext]']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    symlinks: false,
    modules: [path.resolve('node_modules')]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.TARGET': JSON.stringify(TARGET)
    }),
    new CopyWebpackPlugin({ patterns: copyWebpackPlugins }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new WriteFilePlugin({
      log: false
    })
  ]
}
