
//1.引入express第三方对象
const express = require('express');//自动逐级向上查找
//2.构建一个服务器对象
let server = express();
//3.开启服务器监听端口
server.listen(8888,()=>{
    console.log("服务器启动中");
});
//4.处理响应
server.use((req,res)=>{
    res.end('hellowold');
});

