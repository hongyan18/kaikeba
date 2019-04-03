//引入第三方对象
const express = require('express');

let server = express();

//注册一个模版引擎
server.engine('.html',require('express-art-template'));//渲染文件的后缀名


//配置默认的渲染引擎
server.set('view engine', '.html');
//获取路由中间件对象
let router = express.Router()
//res.end只能响应string文件||读文件中的data  buffer
//配置router

//区分生产环境和开发环境
server.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
    imports:{
        num:1,
        reverse:function(str){
            return '^_^'+str+'^_^'
        }
    }
});
router.get('/hero-list',(req,res)=>{
    res.render('list.html',{
        heros:[{name:'貂蝉'},{name:'吕布'},{name:'曹操'}]
    });
})

//添加到中间件中
server.use(router);
//监听端口，并添加回调事件
server.listen(8888,()=>{
    console.log("8888端口启动中")
})