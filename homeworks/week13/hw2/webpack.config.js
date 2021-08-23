const path = require('path');

module.exports = {
  mode: 'development', //production 是預設，'development' 則不會幫忙做壓縮，比較看得懂
  entry: './src/index.js', //程式的入口點
  output: {
    filename: 'main.js', //輸出成此檔案
    path: path.resolve(__dirname, 'dist'), //檔案名稱
    library: "commentPlugin"
  },
};

