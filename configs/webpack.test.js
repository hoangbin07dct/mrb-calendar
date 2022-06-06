const path = require('path');

const config = {
  entry: './src/test.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../examples/js'),
  },
}

module.exports = config;