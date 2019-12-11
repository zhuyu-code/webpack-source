// require("./index.html")
require("./main.css")
console.log("zhuyu");
const Axios=require("axios");
const path=require("path");
window.addEventListener('error', data => {
    Axios.post("http://127.0.0.1:7002/handlemap",
    {
        filename:path.basename(data.filename),
        lineno:data.lineno,
        colno:data.colno
    })
    .then(res=>{
        console.log(res.data);
    })
        console.log(data)
})
throw new Error("错误");
