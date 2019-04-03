//process全局对象，直接使用
//console.log(process.env);
//var会自动提升全局变量，let不会，就是块级
let user = process.env.USERDOMAIN_ROAMINGPROFILE;
if(user=='DESKTOP-V8TAN99'){
    console.log('user为'+user)
}
else{
    console.log("没有该电脑")
}