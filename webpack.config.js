const webpack = require('webpack')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const copyWebpackPlugins = [
  { from: './src/icons' },
  { from: './src/pages/options.css' }
]

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    better_github_prs: path.join(__dirname, 'src', 'js', 'index.jsx'),
    background: path.join(__dirname, 'src', 'js', 'background.js'),
    options: path.join(__dirname, 'src', 'js', 'options.jsx')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
    new CopyWebpackPlugin(copyWebpackPlugins),
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
