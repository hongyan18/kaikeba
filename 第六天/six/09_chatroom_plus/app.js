//koa 解析请求体数据  登录 koa-session  koa-static  koa-router koa-art-template

// 引入
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const render = require('koa-art-template'); 
const path = require('path');
const session = require('koa-session');
const bodyparser = require('koa-bodyparser');

let app = new Koa();
let router = new Router();

const msgs = [
    {username:'小明',centent:'你好'},
    {username:'小红',centent:'你好啊'},
    {username:'小明',centent:'你好漂亮！'},
]
// 全局变量：global
global.mySessionStore = {}
function findBySocketId(socketid){
    for(var tempstamp in global.mySessionStore){
      let obj =  global.mySessionStore[tempstamp];
      if(obj.socketid === socketid){
          return obj;
      }
    }
}

//加入socket.io开始
const IO = require( 'koa-socket' )
const io = new IO()
io.attach( app );//附加到app产生关联
io.on( 'connection', ( content) => {
  console.log('连接上了一个');
  io.broadcast('msg1','我是服务器来的');
})
//加入socket.io结束

//处理登录同步信息
io.on('login',context=>{
    let id = context.data.id;
    global.mySessionStore[id].socketid = context.socket.socket.id
})

//接收用户的消息
io.on("sendMsg",(context)=>{
    //content.socket(客户端的那个连接)
    // //content.socket.socketId 私聊用的
    // console.log('消息来了',context.data.newContent);
    //在这里没有ctx.session所以我们要在这里拿到当前用户的session
    // console.log('当前的socketid',context.data.socket.id);

    //查找对象的用户
    let obj = findBySocketId(context.socket.socket.id)
    // console.log('输出前');
    // console.log(obj);
    // console.log('输出后');

    //广播给所有人
    io.broadcast('allmessage',obj.username+'对所有人说：'+context.data.newContent)

})



render(app,{
    //页面查找的目录
    root:path.join(__dirname,'views'),
    //文件后缀名
    extname:'.html',
    //如果debug：false则每次压缩页面及js，包括混淆，静态数据不会实时更新（不每次实时更新
    //debug true 反之
    debug:process.env.NODE_ENV !== 'production'
})


router.get('/',async ctx=>{
    ctx.render('index');
})
.post('/login',async ctx=>{
    let {username,password} = ctx.request.body
    //不验证，直接挂载在session
    ctx.session.user={
        username
    }
    //1：生成时间戳，将时间戳响应给客户端（类似cookie）
    let id = Date.now();
    console.log(id)
    ctx.session.user.id = id;
    //2:保存到自己的sessionStore中
    global.mySessionStore[id] = {
        username:username
    }
    //重定向到聊天室
    ctx.redirect('/list');
})
.get('/list',async ctx=>{
    //3：接着可以使用了
    ctx.render('list',{
        username:ctx.session.user.username,
        id:ctx.session.user.id,
        msgs
    })
})
// .post('/add',async ctx =>{
//     let username = ctx.session.user.username;
//     let content = ctx.request.body.msg;
//     //加入到数组中，返回最新的消息回去
//     msgs.push({
//         username,content
//     });
//     ctx.body = msgs;
// })
//签名的依据
app.keys = ['test']
//在服务器内存中存储{sessio_id:用户数据}
let store ={
    myStore:{},
    get:function(key){
        return this.myStore[key];
    },
    set:function(key,session){
        this.myStore[key] = session;
    },
    destroy:function(){
        delete this.myStore[key];
    }
}
//处理静态资源
app.use(static(path.resolve('./public')));
//处理session
app.use(session({store},app));
//处理请求体数据
app.use(bodyparser());
//路由
app.use(router.routes());
//处理401 501cld

app.use(router.allowedMethods())

app.listen(8089)
