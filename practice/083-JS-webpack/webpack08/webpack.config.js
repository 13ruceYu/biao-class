const Html = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  plugins: [
    new Html({
      template: './tpl.html'
    }),
  ]
}