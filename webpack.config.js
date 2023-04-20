const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.WEBPACK_MODE || 'development',
  entry: path.join(__dirname, '/client/src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [],
};
