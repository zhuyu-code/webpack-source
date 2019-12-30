
console.log("zhuyu");
const path=require("path");
// const uploadError=require("zy-upload-error");
const uploadError=require('../config/upload')
window.addEventListener('error', data => {
    console.log("执行")
    console.log("index2.js");
    console.log("index2.js");
    console.log(data);
    uploadError({
        projectId:'1a88c60-2844-11ea-8724-fd618e1b67f1',
        versionName:"2.0.2",
        url:"http://122.51.175.158:7001/handlemap",
        filename:path.basename(data.filename),
        lineno:data.lineno,
        colno:data.colno,
        message:data.message
    });
})

throw new Error("抛出错误");
