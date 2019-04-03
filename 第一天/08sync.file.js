//引入核心对象
const fs = require('fs');
//先读后写
let data = fs.readFileSync('a.txt','utf-8');
console.log(data);
//写入到b.text----复制
fs.writeFileSync('./b.txt',data);
console.log("写入成功");