const path =require("path");
const Axios=require("axios");
var WebpackOnBuildPlugin = require('on-build-webpack');
const config={
  entry:{
    app:'./src/index.js',
    app2:'./src/index2.js'
  },//多入口情况，使用对象语法，文档上第二种写法
  mode:'production',
  output:{
    filename:'[name]-buddle.js',//使用name由于多入口不会引起冲突
    path:path.resolve(__dirname,'../dist')//必须为绝对路径
  },
  devtool:'source-map',
  devServer:{
    contentBase:"dist",
    overlay:true
  },
  plugins:[
    new WebpackOnBuildPlugin(function(stats) {
       
    })
  ],
  module:{
    rules:[
      {
      test:/\.css$/,
      use:[
        {
          loader:"style-loader"
        },
        {
          loader:"css-loader"
        }
      ]
      },
      // {
      //   test:/\.html$/,
      //   use:[
      //     {
      //       loader:"file-loader",
      //       options:{
      //         name:"[name].html"
      //       }
      //     },
      //     {
      //       loader:"extract-loader"
      //     },
      //     {
      //       loader:"html-loader",
      //       options:{
      //         attrs:["img:src"]
      //       }
      //     }
      //   ]
      // },
      {

        test: /\.(jpg|git|png)$/,
        
        use: [{
        
        loader: "file-loader",
        
        options: {
        
        name: "images/[name]-[hash:8].[ext]"
        
        }
        
        }]
        
        }
    ]
  }
}
module.exports=config