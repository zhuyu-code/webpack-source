const path =require("path");
const Axios=require("axios");
const fs=require("fs");
const FormData=require("form-data");

class WebpackOnBuildPlugin {
    constructor(config){
        const {root,url,maxContentLength}=config;
        this.root=root;
        this.url=url;
        this.maxContentLength=maxContentLength;
    }
    apply(compiler) {
        compiler.plugin('done', this.callback);
      }
      callback=()=>{
      //遍历文件夹逻辑
      const root=this.root
      var list = fs.readdirSync(root);
      let results=[];
      list.forEach(file=>{
        if(path.extname(file)=='.map'){
          results=results.concat(path.resolve(root,file));
        }
      })
      this.uploadFile(results);
      };
      uploadFile=(paths)=>{
        let formData = new FormData();
        paths.forEach(item=>{
          const readStream=fs.createReadStream(item)
          formData.append(`${path.basename(item)}`,readStream)
        })
        let config = {
            headers: formData.getHeaders()
        }
        Axios.post(this.url,formData, config,{maxContentLength:this.maxContentLength}).then(
        (res)=>{
        console.log(res.data)
        });

    }

  }
  
  module.exports = WebpackOnBuildPlugin;


// const path =require("path");
// const Axios=require("axios");
// const fs=require("fs");
// const FormData=require("form-data");

// class WebpackOnBuildPlugin {
//     constructor(config){
//         const {root,url,maxContentLength}=config;
//         this.root=root;
//         this.url=url;
//         this.maxContentLength=maxContentLength;
//     }
//     apply(compiler) {
//         compiler.plugin('done', this.callback);
//       }
//       callback=()=>{
//           console.log('url是这个值')
//         console.log(this.url)
//         const url=this.url;
//         const maxContentLength=this.maxContentLength;
//         function uploadFile(paths){
//             console.log("进入函数了")
//             console.log(url)
//             let formData = new FormData();
//             paths.forEach(item=>{
//               const readStream=fs.createReadStream(item)
//               formData.append(`${path.basename(item)}`,readStream)
//             })
//             let config = {
//                 headers: formData.getHeaders()
//             }
//             Axios.post(url,formData, config,{maxContentLength:maxContentLength}).then(
//             (res)=>{
//             console.log(res.data)
//             });
    
//         }
//       //遍历文件夹逻辑
//     const root=this.root
//       var list = fs.readdirSync(root);
//       let results=[];
//       list.forEach(file=>{
//         if(path.extname(file)=='.map'){
//           results=results.concat(path.resolve(root,file));
//         }
//       })
//       uploadFile(results);
//       }
//   }
  
//   module.exports = WebpackOnBuildPlugin;





// function WebpackOnBuildPlugin(config) {
//     this.callback = function(){
//        const {root,url,maxContentLength}=config
//         //上传文件逻辑
//         function uploadFile(paths){
//             let formData = new FormData();
//             paths.forEach(item=>{
//               const readStream=fs.createReadStream(item)
//               formData.append(`${path.basename(item)}`,readStream)
//             })
//             let config = {
//                 headers: formData.getHeaders()
//             }
//             Axios.post(url,formData, config,{maxContentLength:maxContentLength}).then(
//             (res)=>{
//             console.log(res.data)
//             });
//           }
    
//           //遍历文件夹逻辑
        
//           var list = fs.readdirSync(root);
//           let results=[];
//           list.forEach(file=>{
//             if(path.extname(file)=='.map'){
//               results=results.concat(path.resolve(root,file));
//             }
//           })
//           uploadFile(results);
//     };
//   };
//   WebpackOnBuildPlugin.prototype.apply = function(compiler) {
//     compiler.plugin('done', this.callback);
//   };
  
//   module.exports = WebpackOnBuildPlugin;
