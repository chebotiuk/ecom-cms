const path = require('path')

module.exports = {
  entry: {
    chat: './client/src/js/chat.js',
    home: './client/src/js/home.js',
    login: './client/src/js/login.js',
    main: './client/src/js/main.js'
  },
  devtool: 'sourcemap',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/'
          }
        }]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'client/dist'),
    publicPath: '/',
  }
}
