var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
const dbName = 'test04';
var obj ={}
//客户端连接服务器
// MongoClient.connect(url, function(err, client) {
//   if(err) throw err; //连接异常
//   // 获取db对象，再获取集合对象（操作数据）
//   const col = client.db(dbName).collection('createIndexExample1');
//   col.insert([{a:1, b:1}
//     , {a:2, b:2}, {a:3, b:3}
//     , {a:4, b:4}], {w:1}, function(err, result) {
//       if(err) throw err; //插入异常 
//       col.find().toArray(function(err,docs) {
//         if(err) throw err; //查询异常
//         console.log(docs);
//         client.close(); // 关闭连接（放回mongodb的连接池）
//       });
//   });
// });
//增删改查,都需要连接，增删改查调用连接函数，获取对象

function _connect(callback){
    MongoClient.connect(url, function(err, client) {
        if(err) throw err; //连接异常
        // 获取db对象，再获取集合对象（操作数据）
        callback(client);
      });
      
}
//插入数据
obj.insert = function(cname,arrData,fn){
    _connect(function(client){
        const col = client.db(dbName).collection(cname);
        col.insert(arrData, function(err, result) {
            //将数据和错误，交给外部处理
            fn(err,result);             
            client.close(); // 关闭连接（放回mongodb的连接池）
        });
    })
   
}
obj.insert('test01',[{name:'你好',name:'不知道'}],function(err,result){
    if(err) throw err;//异常抛出
    console.log(result);//打印结果
})