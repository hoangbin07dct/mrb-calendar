const path = require('path');

const config = {
  entry: './src/index.ts',
  output: {
    filename: 'mrb-calendar.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'MrbCal',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default',
  },
};

module.exports = config;