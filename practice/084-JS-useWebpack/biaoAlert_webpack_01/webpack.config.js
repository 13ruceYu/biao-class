module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}