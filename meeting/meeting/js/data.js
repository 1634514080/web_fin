/*
 * @Description: 
 * @Author: wl
 * @Date: 2024-03-15 08:29:52
 * @LastEditTime: 2024-03-22 09:28:51
 * @LastEditors: wl
 */
//定义一个登录员工的对象
var loginEmploy ;
//定义一个员工对象数组
var employeeJsonArray ;
//发送ajax请求得到员工json数据
$.ajax({
    url : "json/employee.json" ,
    dataType : "json" , 
    async :false ,
    success: function (resp){
        employeeJsonArray = resp 
    }
}
)
//发送 ajax请求得到部门json数据
var deptJsonArray ;
$.ajax({
    url : "json/dept.json" ,
    dataType : "json" , 
    async :false ,
    success: function (resp){
        deptJsonArray = resp 
    }
}
)