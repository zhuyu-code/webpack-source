const path =require("path");
const Axios=require("axios");
const fs=require("fs");
const FormData=require("form-data");
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

      //上传文件逻辑
      function uploadFile(paths){
        let formData = new FormData();
        paths.forEach(item=>{
          const readStream=fs.createReadStream(item)
          formData.append(`${path.basename(item)}`,readStream)
        })
        let config = {
            headers: formData.getHeaders()
        }
        Axios.post("http://localhost:7002/fileuploadsStream",formData, config,{maxContentLength:2000}).then(
        (res)=>{
        console.log(res.data)
        });
      }

      //遍历文件夹逻辑
      const root=path.resolve("./dist");
      var list = fs.readdirSync(root);
      let results=[];
      list.forEach(file=>{
        if(path.extname(file)=='.map'){
          results=results.concat(path.resolve(root,file));
        }
      })
      uploadFile(results);
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