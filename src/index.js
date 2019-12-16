// require("./index.html")
require("./main.css")
console.log("zhuyu");
const Axios=require("axios");
const path=require("path");
const uploadError=require("zy-upload-error")
window.addEventListener('error', data => {
    console.log(data);
    uploadError({
        url:"http://127.0.0.1:7001/handlemap",
        filename:path.basename(data.filename),
        lineno:data.lineno,
        colno:data.colno
    });
})
throw new Error("错误");
