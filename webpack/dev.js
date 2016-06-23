'use strict'

const webpack = require('webpack')
const baseConfig = require('./base')
const defaultSettings = require('./defaults')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    './client/app.js'
  ],
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'DEV': process.env.DEV || true
      }
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('./css/style.css')
  ],
  module: defaultSettings.getDefaultModules()
})

module.exports = config
