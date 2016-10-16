const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
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
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&localIdentName=[local]!sass?paths=/src'
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
