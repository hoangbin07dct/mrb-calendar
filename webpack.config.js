const configLib = require('./configs/webpack.lib');
const configTest = require('./configs/webpack.test')
  module.exports = (mode) => {
    const config = mode.lib ? configLib : configTest;
    process.env.NODE_ENV = mode.production ? 'production' : 'development';
    // console.log(process.env.NODE_ENV);
    return {
      target: ['web', 'es5'],
      devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
      entry: config.entry,
      output: config.output,
      resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              { loader: 'ts-loader', options: { transpileOnly: true } }
            ]
          }
        ]
      },
    }
  };