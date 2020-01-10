
const path=require("path");
// const uploadError=require("zy-upload-error");
const uploadError=require('../config/upload')
window.addEventListener('error', data => {
    console.log(data.error.stack.split('\n'));
    uploadError({
        projectId:'0c4a4c30-2ba7-11ea-9d85-1b9864748d81',
        versionName:"2.0.6",
        url:"http://127.0.0.1:7002/handlemap",
        filename:path.basename(data.filename),
        lineno:data.lineno,
        colno:data.colno,
        message:data.message
    });
})

throw new Error("抛出错误");
