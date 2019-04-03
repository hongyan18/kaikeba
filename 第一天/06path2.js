//接受一段字符串路径
const path = require('path');
let myPath = path.join(__dirname,'hello','word','text.js');
//解析这个路径为对象，更易于操作
let pathObj = path.parse(myPath);
//console.log(pathObj);
//base可以修改文件名或后缀的方式
pathObj.base = '新建文本.text';
console.log(pathObj);
//接受路径对象，转换成路径字符串
