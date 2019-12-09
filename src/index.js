// require("./index.html")
require("./main.css")
console.log("zhuyu");

window.addEventListener('error', data => {
    console.log(data)
})
throw new Error("错误");
