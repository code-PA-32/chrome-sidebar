const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = merge(common, {
  mode: "production",
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    'side-bar': path.resolve('src/side-bar/side-bar.tsx'),
    background: path.resolve('src/background.ts'),
    content: path.resolve('src/content.ts'),
  },
  module: {
    rules: [
      {
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "React Chrome Extension",
      filename: "popup.html",
      chunks: ["popup"],
      template: path.resolve("src/popup/popup.html"),
    }),
    new HtmlWebpackPlugin({
      title: "React Chrome Extension",
      filename: "side-bar.html",
      chunks: ["side-bar"],
      template: path.resolve("src/side-bar/side-bar.html"),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      crypto: false,
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
