module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 60 * 1024,
          }
        }],
      }
    ]
  }
}