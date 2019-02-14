const Clean = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: __dirname + '/dist',
  },
  plugins: [
    new Clean(['./dist']),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'head',
      minify: {
        collapseWhitespace:true,
        collapseBooleanAttributes: true,
        removeComments: true,
      },
    }),
  ]
}