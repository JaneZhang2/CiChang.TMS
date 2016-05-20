const path = require('path');
const merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
const rucksack = require('rucksack-css');

const TARGET = process.env.npm_lifecycle_event;

const CleanPlugin = require('clean-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

var common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: PATHS.app
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
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    output: {
      filename: '[name].js'
    },
    devServer: {
      // contentBase: PATHS.build,
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: '0.0.0.0',
      //process.env.HOST,
      port: process.env.PORT
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css!postcss!px2rem?remUnit=75&remPrecision=8'
        },
        {
          test: /\.scss$/,
          loader: 'style!css!postcss!px2rem?remUnit=75&remPrecision=8!sass'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      vendor: Object.keys(package.dependencies)
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!px2rem?remUnit=75&remPrecision=8')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!px2rem?remUnit=75&remPrecision=8!sass')
        }
      ]
    },
    plugins: [
      new CleanPlugin([PATHS.build]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
      new ExtractTextPlugin('bundle-[hash].css', {allChunks: true})
    ]
  });
}