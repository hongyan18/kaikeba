
//1.引入对象
const express = require('express');
//2.创建服务器对象
let server1 = express();
//3.处理响应------什么请求都可以进来
server1.use(function(req,res,next){
    res.send("服务器启动了")
    //express中保持了原生node的api
})
//4.监听端口
server1.listen(10000,function(){
    console.log("10000端口已启动")
});


//1.引入对象
const Koa = require('koa');
//2.创建服务器对象
let server2 = new Koa();
//3.处理响应
server2.use(function(context){
    context.body = ' koa ok!';
});
//4.监听端口
server2.listen(10001,()=>{
    console.log("服务器启动在10001端口");
})



