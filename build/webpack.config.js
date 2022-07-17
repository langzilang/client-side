const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require("path")

module.exports = {
  entry: "./src/index.ts",
  output: {
    // path: __dirname + './dist',
    path:path.resolve(__dirname, './dist'),
    filename: "main.js"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test:/\.tsx?$/,
      use:'ts-loader',
      exclude: /node_modules/
    }]
  },
  devtool:  process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    // [webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
    // - options has an unknown property 'contentBase'. These properties are valid:
    // object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, static?, watchFiles?, webSocketServer? }
    // contentBase: './dist', //修改为下面的写法不报错
    // static: './dist',   // 然后发现改成这种也不对，改成下面的试试  -- >   是可以的，这种和下面的都可以，是我看错报错信息了
    static: {
      directory: path.join(__dirname, './dist'),
    },
    stats: 'errors-only',
    compress: false,
    host: 'localhost',
    port: 8089
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CleanWebpackPlugin({
    //   // cleanOnceBeforeBuildPatterns: ['./dist']
    //   // cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
    // }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}