/*
 * @Description: 
 * @Author: wl
 * @Date: 2024-03-08 10:19:00
 * @LastEditTime: 2024-03-15 10:30:00
 * @LastEditors: wl
 */
//完成登录功能
function login(){
   //alert("afdafdfds")
   //得到用户名
   var uname = $("#uname").val() ;
   //得到密码
   var pwd = $("#pwd").val() ;
   //alert (uname + "," + pwd)
   //遍历所有员工进行比较，查看是否有当前用户
   for(var i = 0 ; i < employeeJsonArray.length ; i++){
      //得到每一个对象
      var employ = employeeJsonArray[i] ;
      //将当前对象的用户名与密码与输入的用户名密码进行比较
      if(employ.name == uname 
         && employ.password == pwd
         && employ.autditstatus == 1){
            //满足条件进行页面跳转
            //根据角色不同跳转到不同的页面
            if(employ.role == 1){
               window.location.href = "admin.html?employId=" +  employ.eid;
            }else{
               window.location.href = "common.html"
            }            
         } 
   }
   $("#errorInfo").html("登录失败！！！！")
}
//登录校验
function loginCheck(){
    //获取到用户名的组件
    var uname = document.getElementById("uname") ;
     //得到用户名的值
     var unametrue = uname.value ;
     //得到密码组件
     var pwd = document.getElementById("pwd") ;
     //得到密码的值
     var pwdtrue = pwd.value ;
     //得到输入错误显示内容的组件
     var error = document.getElementById("errorInfo") ;
     //判断用户名是否输入信息
     if(unametrue == ""){
        //表示没有输入任何信息
        //添加错误提示
        error.innerHTML = "请输入用户名，不能空着呀！！！！！" 
        return false ;       
     }
     if(pwdtrue == ""){
        error.innerHTML = "请输入密码，不能空着呀！！！！"
        return false ;
     }
     return true ;
}