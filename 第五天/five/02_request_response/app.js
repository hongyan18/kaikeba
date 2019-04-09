// #### request常用属性

// - ctx.request.url(ctx.url)
// - ctx.request.method(ctx.method)
// - ctx.request.headers(ctx.headers)



// #### response常用属性

// - ctx.response.set(ctx.set)  __函数:参数key,val__
// - ctx.response.status(ctx.status)

// - ctx.response.body(ctx.body)  
//1.引入对象
const Koa = require('koa');
//2.创建服务器对象
let app = new Koa();
//3.请求与响应之间发生的一件事 中间件
app.use((context,next)=>{
    console.log(context.request.url);
    console.log(context.request.method);
    console.log(context.request.headers)
    next();//放行
});

app.use((ctx)=>{
    console.log('第二件事');
    ctx.set('mytest','123456');
    ctx.status = 205;
    ctx.body= '<h1>333</h1>';
})

// app.use((ctx)=>{
//     console.log('第二件事');
  
//     // 响应头/状态码，体
//     // ctx.response.set('mytest','12345');
//     // ctx.response.status = 200;
//     // ctx.response.body = '<h1>大家好</h1>'; 
//     ctx.set('mytest','12345');
//     ctx.status = 200;
//     ctx.body = '<h1>大家好</h1>';
  
  
//   })
//4.监听端口
app.listen(8089);
//404 在框架中最终未影响页面