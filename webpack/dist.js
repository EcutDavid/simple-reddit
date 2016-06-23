'use strict'

let path = require('path')
let webpack = require('webpack')

let baseConfig = require('./base')
let defaultSettings = require('./defaults')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/client'),
  cache: false,
  devtool: 'null',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.DEV': process.env.DEV || false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('./css/style.css')
  ],
  module: defaultSettings.getDefaultModules()
})

module.exports = config
