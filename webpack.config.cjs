// webpack.config.js
const CircularDependencyPlugin = require('circular-dependency-plugin')
const fs = require('fs')
const path = require('path')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return [ '.bin' ].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  mode: 'development',
  entry: './main-module.js',
  output: {
    // library: 'svgdom',
    libraryTarget: 'commonjs',
    filename: './main-require.cjs',
    path: __dirname
  },
  // This function is only to make __dirname work properly!!!
  externals: [ nodeModules, function (context, request, callback) {
    if (/dirname.cjs/.test(request)) {
      return callback(null, 'commonjs ./' + path.join('./', path.relative(__dirname, context), request).replace(/\\/g, '/'))
    }
    callback()
  } ],
  devtool: 'inline-source-map',
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // include specific files based on a RegExp
      // include: /dir/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    })
  ],
  target: 'node'

}
