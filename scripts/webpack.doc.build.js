const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: ['./doc/index.jsx'],
  output: {
    filename: '[name]-[hash:7].js',
    path: path.join(__dirname, '../doc-dist'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './doc/index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ]
}
