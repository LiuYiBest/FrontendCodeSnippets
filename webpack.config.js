const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist') // 输出路径
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 处理CSS文件
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 处理图片文件
        type: 'asset/resource',
      },
    ],
  },
}; 