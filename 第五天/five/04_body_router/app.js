const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
var app = new Koa();


app.use(bodyParser());
 
app.use(async ctx => {
    console.log("有进来啊");
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
  console.log(ctx)

});

app.listen(8089,()=>{
    console.log("8089端口启动了")
})