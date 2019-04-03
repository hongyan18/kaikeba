//引入第三方对象
const express = require('express');
const fs = require('fs');
const formidable = require('formidable')
const path = require('path')
let server = express();


let heros =[]
//注册一个模版引擎
server.engine('.html',require('express-art-template'));//渲染文件的后缀名
server.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
    
});
//配置默认的渲染引擎
server.set('view engine', '.html');
//获取路由中间件对象
let router = express.Router()

//添加
router.get('/',(req,res,next)=>{
    //传入页面、和对象
    res.render('index',{
        heros,//ES6属性简写
    });
})
.post('/add',(req,res,next)=>{
   
    //解析文件,用包

    var form = new formidable.IncomingForm();
    console.log("尽量？？");
    //修改上传目录
    form.uploadDir = path.join(__dirname,'public','imgs');
    //保存文件后缀名
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
    //    console.log(fields);//fields.nickname  files.avter.path
    //    console.log(files);
       console.log(fields.nickname)
       let nickname = fields.nickname;
       let filename = path.parse(files.avter.path).base
       //存储img：网络能请求到的路径  img/uploadxx.js
       let img = 'imgs/' + filename;
       heros.push({
        nickname,img
       });
       console.log(heros)
       //同步提交，浏览器等待页面显示
       res.redirect('/');

    });

})
//最后一条路由中
.all('*',(req,res)=>{
    res.send('地址错误，您去首页吧')
})



//要把public下的js的文件暴露出来
server.use(express.static('./public'));//当虚拟母目录/public被匹配以后，未来url都会去除掉/public

//添加到中间件中
server.use(router);
//监听端口，并添加回调事件

//处理错误(参数位置错误优先)
server.use((err,req,res,next)=>{
    console.log(err);
    res.send('<h1>亲爱的与用户，您访问的页面被程序猿删掉了，您可以<a href="/">返回首页</a></h>看看')
})
server.listen(8888,()=>{
   
    console.log("8888端口启动中")
})
