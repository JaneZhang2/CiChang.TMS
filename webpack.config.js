const path = require('path');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const rucksack = require('rucksack-css');

const CleanPlugin = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const common = {
  context: PATHS.src,
  entry: {
    bundle: './index'
  },
  output: {
    path: PATHS.dist
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.src
      }
    ]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    output: {
      publicPath: '/',
      filename: '[name].js'
    },
    resolve: {
      alias: {
        'app.config': `${PATHS.src}/configs/app.debug.config`
      }
    },
    devtool: 'eval-source-map',
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
          test: /\.scss$/,
          loader: 'style!css!postcss!px2rem?remUnit=75&remPrecision=8!sass'
        },
        {
          test: /\.css$/,
          loader: 'style!css!postcss!px2rem?remUnit=75&remPrecision=8'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if (/^build:.*$/.test(TARGET)) {
  module.exports = merge(common, {
    entry: {
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    resolve: {
      alias: {
        'app.config': `${PATHS.src}/configs/app.build.config`,
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
      new CleanPlugin([PATHS.dist]),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        },
        __DEV__: /:dev$/.test(TARGET),
        __QA__: /:qa$/.test(TARGET),
        __YZ__: /:yz$/.test(TARGET),
        __PROD__: /:prod$/.test(TARGET)
      }),
      new ExtractTextPlugin('bundle.[chunkhash].css', {allChunks: true})
    ]
  });
}