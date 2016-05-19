const path = require('path');
const rucksack = require('rucksack-css')
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
const CleanPlugin = require('clean-webpack-plugin');

const common = {
  context: __dirname + "/src",
  entry: {
    bundle: './index'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=core/fonts/[name]-[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!px2rem?remUnit=75&remPrecision=8!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss!px2rem?remUnit=75&remPrecision=8'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
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

// Default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
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
    }, plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      vendor: Object.keys(package.dependencies)
      // .filter(function (v) {
      //   // Exclude alt-utils as it won't work with this setup
      //   // due to the way the package has been designed
      //   // (no package.json main).
      //   // return v !== 'alt-utils';
      // })
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    plugins: [
      new CleanPlugin([path.join(__dirname, 'build')]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });

  // module.exports = merge(common, {
  //   output: {
  //     filename: '[name]-[hash].js'
  //   },
  //   module: {
  //     loaders: [
  //       {
  //         test: /\.css$/,
  //         loader: ExtractTextPlugin.extract('style', 'css')
  //       },
  //       {
  //         test: /\.scss$/,
  //         loader: ExtractTextPlugin.extract('style', 'css!sass')
  //       }
  //     ]
  //   },
  //   plugins: [
  //     new webpack.optimize.OccurenceOrderPlugin(),
  //     new webpack.optimize.UglifyJsPlugin({
  //       sourceMap: false,
  //       compressor: {
  //         warnings: false
  //       }
  //     }),
  //     new HtmlWebpackPlugin({
  //       template: './src/index-build.html'
  //     }),
  //     new ExtractTextPlugin('bundle-[hash].css', {allChunks: true})
  //   ]
  // });
}