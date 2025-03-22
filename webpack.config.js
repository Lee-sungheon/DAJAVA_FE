const path = require('path');

module.exports = {
  mode: 'production',
  entry: './sdk/eventRecorder.ts',
  output: {
    path: path.resolve(__dirname, './public/sdk'),
    filename: 'event-recorder.js',
    library: 'dajava',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.sdk.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
