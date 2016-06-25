'use strict'
const path = require('path')
const srcPath = path.join(__dirname, '/../src')
const defaultPort = 8080
const ExtractTextPlugin = require("extract-text-webpack-plugin")

function getDefaultModules() {
  return {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader!postcss-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: 'node_modules'
      }
    ]
  }
}

module.exports = {
  srcPath: srcPath,
  publicPath: './scripts/react/',
  port: defaultPort,
  getDefaultModules: getDefaultModules
}
