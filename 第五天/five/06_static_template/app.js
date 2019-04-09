const Koa = require('koa');
//引入
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const static = require('koa-static');
var app = new Koa();

let router = new Router();
render(app, {
    //页面查找目录
    root: path.join(__dirname, 'view'),
    //后缀名
    extname: '.html',
    //如果debug：false则每次压缩页面及js，包括混淆，静态数据不会实时更新（不每次实时更新
    //debug true 反之
    debug: process.env.NODE_ENV !== 'production'
  });
router.get('/',async ctx=>{
    //ctx.body = 'index';
    ctx.render('index')
});
//在静态资源的处理之前，重写yrk，改变用户url的请求
app.use(async(ctx,next)=>{
    if(ctx.url.startsWith('/public')){
        //改写请求url
        //将public的改写为空
        ctx.url = ctx.url.replace('/public',"")
      
    }
    //放行，交给static处理（不管如何都放行）
    await next();
    console.log("执行了")
})
//静态资源
app.use(static(path.resolve('./public')));

app.use(router.routes())
.use(router.allowedMethods());
app.listen(8089,()=>{
    console.log("8089端口启动了")
})