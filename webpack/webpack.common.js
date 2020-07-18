const Path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    background: ['@babel/polyfill', Path.resolve(__dirname, '../src/js/background.ts')],
    popup: ['@babel/polyfill', Path.resolve(__dirname, '../src/js/popup/index.tsx')],
  },
  node:{ fs: 'empty' },
  output: {
    path: Path.join(__dirname, '../extension/dest'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: false
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dest/**/*']
    }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../src/public'), to: '../' }
    ]),
    // new HtmlWebpackPlugin({
    //   template: Path.resolve(__dirname, '../src/index.html')
    // })
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.tsx', '.ts', '.jsx']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'antd': 'antd',
    'moment': 'moment'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "useBuiltIns": "entry",
                  "corejs": 3
                }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            "plugins": [
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true
                }
              ],
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.s?css/i,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
};
