//接收命令行参数，根据该目录，读取目录下的所有文件并输出（遍历文件夹）
const fs = require('fs');
const path = require('path');
//1.接收命令行参数 node ./01_read_dir_files.js c://xxxx//xxxx//xx
//2.修正该路径 path.resolve(process.argv[2]);
let inputPath = path.resolve(process.argv[2]);

function testReadFiles(dir){// ./a
    try{
        //3.判断该路径是否存在fs.access(fs.constants.F_OK)
        fs.accessSync(dir,fs.constants.F_OK);
        //4.遍历该文件夹
    //  4.1:function(dir){//判断该路径是文件还是文件夹，是文件输出，}
        let state = fs.statSync(dir);//a
        if(state.isFile()){
            console.log("这是一个文件")
        }else if(state.isDirectory()){
            console.log("这是一个文件夹")
            //如果是文件夹，读取子文件夹，继续调用自己
          let files =  fs.readdirSync(dir); //./a
          //fils:[a.txt,b]
          files.forEach(file => {
              //调用自己这函数，如果是文件，函数内直接输出，是文件夹，继续调用自己
              testReadFiles(path.join(dir,file))
          })
            console.log(files);//[ 'a.txt', 'a2' ]
        }
    }catch(e){
        console.log(e)
        console.log('该文件或文件夹不存在');
    }
}
testReadFiles(inputPath)
