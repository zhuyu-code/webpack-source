const path =require("path");
const Axios=require("axios");
const fs=require("fs");
const FormData=require("form-data");
// var WebpackOnBuildPlugin = require("zy-map");
var WebpackOnBuildPlugin=require("./souremap")
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
      url:"http://122.51.175.158:7001/fileuploadsStreams",
      maxContentLength:5000,
      projectId:'1a88c60-2844-11ea-8724-fd618e1b67f1',
      versionName:'2.0.4',
      versionDesc:'这个版本主要做前前端联调'
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