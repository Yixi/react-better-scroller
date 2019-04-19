const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./doc/index.jsx'],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../doc-dist'),
    publicPath: ''
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 2223
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
  plugins: [
    new HTMLWebpackPlugin({
      template: './doc/index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
