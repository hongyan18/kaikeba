//F:\BaiduNetdiskDownload\开课吧Web 2019\开课吧web全栈架构师四期\11课   NodeJS基础-第1天-{ 全局、核心对象、异步IO }
const myPath = 'F:\BaiduNetdiskDownload\开课吧Web 2019\开课吧web全栈架构师四期\11课   NodeJS基础-第1天-{ 全局、核心对象、异步IO }' ;
const fs = require('fs');
console.log("读取前");
fs.readFile(myPath,()=>{
    console.log("工作A")
});
console.log("读取后");