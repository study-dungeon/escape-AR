module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader','css-loader']
      },
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
