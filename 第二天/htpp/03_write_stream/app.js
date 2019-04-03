const http = require('http');
const fs = require('fs');

let server = http.createServer((req,res)=>{
    if(req.url==='/'){
        fs.readFile('./index.html',(err,data)=>{
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end(data)
        });
    }else if(req.url==='/test'&&req.method==='GET'){
        //告知客户端，可以一点一点的显示
        res.writeHead({'content-type':'application/octet'});
        setInterval(function(){
            res.write(''+Date.now());
        },1000);
    }
}).listen(8888);