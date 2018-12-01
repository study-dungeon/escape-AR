module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   use: [{ loader: 'file-loader' }],
      // },
    ],
  },
};
