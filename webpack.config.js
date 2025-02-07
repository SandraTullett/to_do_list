import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  mode: 'development',
  devServer: {
    static: './public',
    hot: true,
  },
  output: {
    libraryTarget: "window",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'about.html',
    //   template: './public/about.html',
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { context: "public", from: "*.css" }
      ]
    })
  ]
}