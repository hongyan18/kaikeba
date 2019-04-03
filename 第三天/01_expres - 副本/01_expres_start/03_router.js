//引入第三方对象
const express = require('express');

let server = express();
//获取路由中间件对象
let router = express.Router()
//res.end只能响应string文件||读文件中的data  buffer
//配置router
router.get('/login',(req,res)=>{
    //设置响应编码
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    res.end('登录页面');
})
.get('/register',(req,res)=>{
     //设置响应编码
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    res.end('register page');
})
.get('/json',(req,res)=>{
    //设置响应编码
   res.json([{name:'jack'}])
})
.get('/redirect',(req,res)=>{
   res.redirect('http://www.baidu.com')
})
.get('/download',(req,res)=>{
   res.download('./03_router.js');
   //基于服务器会写的content-type等头信息
})
.get('/jsonp',(req,res)=>{
   res.jsonp('./03_router.js');
   //基于服务器会写的content-type等头信息
})
//添加到中间件中
server.use(router);
//监听端口，并添加回调事件
server.listen(8888,()=>{
    console.log("8888端口启动中")
})