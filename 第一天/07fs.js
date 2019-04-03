const fs = require('fs');
fs.readFile ('./a.txt',(err,data)=>{
    if(err) throw err; //抛异常到控制台显示
    console.log(data);
    //获取字符串数据，就可以调用buffer编码
    console.log(data.toString('utf-8'));
    //fs.write
    // fs.writeFile('./a.txt','//这里是注释啊！！！',(err,data)=>{
    //     if(err) throw err;
    //     console.log('书写文件完成！');
    // })
    fs.appendFile('./a.txt','//这里是注释啊！！！',(err,data)=>{
        if(err) throw err;
        console.log('书写文件完成！');
    })
})