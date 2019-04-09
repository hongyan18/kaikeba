const Koa = require('koa');
//引入
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
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
})
.post('/login',async ctx => {
    //用户名abc，密码123
    //会写cookie，保存用户数据到session中
    console.log(ctx.request.body)
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    //ctx.set('content-type','text/html;charset:utf-8')
    if(username!="abc"||password!='123'){
        //koa中的异常处理
        ctx.throw(200,`
        ^_^ 报错了，但是不告诉你哪出错了^_^`);
        
    }else{
        //使用session保存
        ctx.session.user = {
            username:'abc'
        }
        ctx.body = "登录成功";
    }
})
.get('/list',ctx=>{
    ctx.body = '当前登录用户为：'+ctx.session.user.username;
})
// 通过任意字符串为基准进行加密算法的字符串
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', //session的命
    maxAge: 86400000,
    autoCommit: true, 
    overwrite: true, 
    httpOnly: true, //不允许在客户端操作cookie
    //{"user":{"username":"abc"},"_expire":1554883799613,"_maxAge":86400000}
    //未做数据签名
    signed: true,  //数据签名，保证数据不被串改
    rolling: false,  //过期时间访问顺序
    renew: false, 
  };
app.use(session(CONFIG, app));
//静态资源
app.use(static(path.resolve('./public')));
//ctx.request.body挂载属性
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
//错误处理
app.on('error', (err, ctx) => {
    console.log( err);

  });
app.listen(8089,()=>{
    console.log("8089端口启动了")
})