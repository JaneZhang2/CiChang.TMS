const path = require('path');
const merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const rucksack = require('rucksack-css')

const CleanPlugin = require('clean-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};


var config = {
  entry: {
    vendor: Object.keys(pkg.dependencies),
    bundle: ['./src/index.jsx']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[id].bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.APP_MODEL === 'BUILD' ? '"production"' : '"development"'
      },
      __DEV__: process.env.APP_ENV === 'DEV',
      __QA__: process.env.APP_ENV === 'QA',
      __YZ__: process.env.APP_ENV === 'YZ',
      __PROD__: process.env.APP_ENV === 'PROD',
      __BUILD__: process.env.APP_MODEL === 'BUILD'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: "url-loader?limit=16384&name=images/[name]-[hash].[ext]"
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
    }]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ]
};

if (process.env.APP_MODEL === 'DEBUG') {
  module.exports = merge(config, {
    devtool: 'eval',
    entry: {
      vendor: ['webpack-hot-middleware/client']
    },
    output: {
      publicPath: '/static/'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
} else if (process.env.APP_MODEL === 'BUILD') {
  module.exports = merge(config, {
    output: {
      filename: '[name]-[hash].js'
    },
    resolve: {
      alias: {
        moment: "moment/min/moment-with-locales.min.js"
      }
    },
    module: {
      noParse: [/moment-with-locales/, /mui/],
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!px2rem?remUnit=75&remPrecision=8'),
          exclude: [/rmc-picker/]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: [/rmc-picker/]
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!px2rem?remUnit=75&remPrecision=8!sass')
        }
      ]
    },
    plugins: [
      new CleanPlugin([PATHS.build]),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compressor: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new ExtractTextPlugin('bundle-[hash].css', {allChunks: true})
    ]
  });
}