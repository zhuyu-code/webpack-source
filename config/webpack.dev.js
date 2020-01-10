const path =require("path");
const Axios=require("axios");
const fs=require("fs");
const FormData=require("form-data");
var WebpackOnBuildPlugin = require("zy-map");
// var WebpackOnBuildPlugin=require("./souremap")
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
  devtool:'source-map',//使用隐藏source-map不会被浏览器发现路径
  devServer:{
    contentBase:"dist",
    overlay:true
  },
  plugins:[
    new WebpackOnBuildPlugin({
      root:path.resolve("./dist"),
      url:"http://127.0.0.1:7002/fileuploadsStreams",
      maxContentLength:5000,
      projectId:'0c4a4c30-2ba7-11ea-9d85-1b9864748d81',
      versionName:'2.0.6',
      versionDesc:'这个版本是玩的'
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