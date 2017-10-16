var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin')

var config = {
    cache: true,
    entry: [
        './src/client.js'
    ],
    output: {
        hashDigestLength: 8,
        filename: 'public/bundle-[hash].js'
    },
    module: {
        noParse: [/^react$/],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    node: {
        fs: "empty"
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    plugins: [
      new CleanWebpackPlugin(['public/bundle*']),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
          "process.env": {
              NODE_ENV: JSON.stringify("production")
          }
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              screw_ie8: true,
              drop_console: true,
              warnings: false
          }
      })
    ]
};

module.exports = config;
