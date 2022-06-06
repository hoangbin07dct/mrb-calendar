const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
  module.exports = (mode) => {
    process.env.NODE_ENV = mode.production ? 'production' : 'development';
    // console.log(process.env.NODE_ENV);
    return {
      entry: './src/index.ts',
      target: ['web', 'es5'],
      devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
      module: {
        rules: [
        {
           test: /\.(js|jsx|tsx|ts)$/,
           exclude: /node_modules/,
           loader: 'babel-loader',
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      },
      output: {
        filename: 'mrb-calendar.js',
        path: path.resolve(__dirname, 'dist'),
        // library: {
        //   type: "self",
        //   export: "default"
        // },
          library: {
          name: 'Calendar',
          type: "umd",
          umdNamedDefine: false
        },
        globalObject: 'this'
       
      },

    }
  };