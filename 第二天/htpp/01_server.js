//1.引入核心对象
const http = require('http');
//2.创建服务器
let server = http.createServer();
//3.基于时间，很多的on('xxxx')
// server.on('request',(req,res)=>{
//     //不管请求什么，都返回同一个数据
//     res.end('你在请求端口做什么？');

// });
server.on('request',(req,res)=>{
    //不管请求什么，都返回同一个数据
   //req 是只读对象，拿属性
   //res 是只写对象，调函数
   //写好=》1.一次性ie 2：多次写
   res.setHeader('a','a');
   res.setHeader('b','b');
   res.setHeader('c','c');
   //状态码  添加页面编码格式
   res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
   //写体（一次）
   res.write('两只黄鹂宁翠柳');
   res.write('一行白鹭上青天');

});
//ip找计算机  端口找程序
server.listen(9999,()=>{
    console.log("9999端口已启动");
});