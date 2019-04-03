const express = require("express");
let app = express();
//1.app.use是请求与相应中执行的一件事，按代码顺序来执行
//2.next()是放行到下一件事开关
app.listen(8888,()=>{
    console.log('服务器8888端口已启动:');
});
//用户选择性url开头的部分，选择性调用对应的事
app.use('/sucai',(req,res,next)=>{
    console.log('白菜');
    next();
});
app.use('/sucai',(req,res,next)=>{
    console.log('萝卜');
    next();
});
app.use('/huncai',(req,res,next)=>{
    console.log('牛肉');
    next();
});
app.use('/huncai',(req,res,next)=>{
    console.log('羊肉');
    next();;
    next();
});
app.use('/huncai',(req,res,next)=>{
    console.log('猪肉')
});