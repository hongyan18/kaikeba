//需求：读取一个html文件，展示给用户显示
//引入核心对象
const fs = require('fs');
//创建服务对象
const Koa = require('koa');
let app = new Koa();
//声明函数asyncReadFile
function asyncReadFile() {
    //把结果返回
    return new Promise(function (resolve, reject) {
        fs.readFile('./index.html', (err, data) => {
            //1.失败 err2.成功需要data
            if (err) {
                reject(err);
                return;
            }
            //成功
            resolve(data);
        });
    });
};
//aysnc（声明函数中有异步操作）+await(等待) =promise
app.use(async(ctx) => {
    if (ctx.url === '/') {
        //测试是否响应了
        console.log('进入了use')
        //响应首页
        let data = await asyncReadFile(); //异常使用catch
        console.log(data);
        //ctx.body = data.toString();
        //项目使用------设置响应头
        ctx.set('content-type','text/html;charset=utf-8');
    } else {
        //OK
        ctx.body = 'OK';
    }
});
app.listen(8089, () => {
    console.log("8089端口已启动")
});