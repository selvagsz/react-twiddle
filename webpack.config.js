'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))

let webpackConfig = {
  resolve: {
    root: [
      path.resolve('node_modules'),
      path.resolve('./src'),
    ],
  },

  entry: {
    app: ['./src']
  },

  output: {
    path: './dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'web_modules')
        ],
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.(json)$/,
        loader: 'json'
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style!css?modules&localIdentName=[local]!sass?paths=/src'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  devServer: {
    contentBase: './dist',
    inline: true
  }
}

if (argv.env === 'production') {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ])
}

module.exports = webpackConfig
