//引入第三方对象
const express = require('express');
const fs = require('fs');
let server = express();

//注册一个模版引擎
server.engine('.html',require('express-art-template'));//渲染文件的后缀名


//配置默认的渲染引擎
server.set('view engine', '.html');
//获取路由中间件对象
let router = express.Router()

server.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
    
});
router.get('/',(req,res,next)=>{
    console.log('进入来嘛');
    //假如获取文件
    let errorPath = './abc/e.txt';
    try{
        fs.readdirSync(errorPath)
        res.render('index');

    }catch (err){
        //throw err //给用户看到了异常，体验不好
        next(err); //触发一个具备4个参数的中间件函数
    }
})
//最后一条路由中
.all('*',(req,res)=>{
    res.send('地址错误，您去首页吧')
})
//要把public下的js的文件暴露出来
server.use('/public',express.static('./public'));//当虚拟母目录/public被匹配以后，未来url都会去除掉/public
//添加到中间件中
server.use(router);
//监听端口，并添加回调事件
server.listen(8888,()=>{
    console.log("8888端口启动中")
})

//处理错误(参数位置错误优先)
server.use((err,req,res,next)=>{
    res.send('<h1>亲爱的与用户，您访问的页面被程序猿删掉了，您可以<a href="/">返回首页</a></h>看看')
})