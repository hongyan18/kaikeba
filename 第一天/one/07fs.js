const fs = require('fs');
fs.readFile('./a.txt',(err,data)=>{
    if(err) throw err; 
    console.log(data);
})