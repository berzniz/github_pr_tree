const webpack = require('webpack')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const copyWebpackPlugins = [
  { from: './src/icons' }
]

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, 'src', 'js', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'better_github_prs.js'
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
    new WriteFilePlugin({
      log: false
    })
  ]
}
