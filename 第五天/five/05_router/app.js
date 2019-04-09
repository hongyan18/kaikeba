const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
//引入
const Router = require('koa-router');
var app = new Koa();

//配置路由
let router = new Router();
//规则
router.get('/',async ctx =>{
    ctx.body = '首页';
})
.post('/post',async ctx => {
    ctx.body = ctx.request.body; // 直接响应请求体数据
  })

//koa-bodyparser一定要在router.routes之前

 app.use(bodyParser());//在router后/post无法请求
//产生关联
app.use(router.routes());//将路由和实例挂钩

app.use(router.allowedMethods());

app.listen(8089,()=>{
    console.log("8089端口启动了")
})