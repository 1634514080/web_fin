/*
 * @Description: 
 * @Author: wl
 * @Date: 2024-03-29 09:28:06
 * @LastEditTime: 2024-03-29 10:01:46
 * @LastEditors: wl
 */
//得到跳转前传递的参数值
var did = getParam("deptid") ;
//得到所有的部门信息
var deptJsonArray = window.parent.deptJsonArray 
//因为跳转到回显页面的时候就需要加载当前部门的信息，所以写在全局变量中
$(function(){
    //遍历所有的部门信息
    for(var i = 0 ; i < deptJsonArray.length ; i++){
        //得到每个部门
        var dept = deptJsonArray[i] ;
        //比较当前的部门是否是对应的传递did值的部门
        if(dept != undefined && dept.did == did){
            //修改页面对应的value值
            $("#name").val(dept.dname)                
            $("#remark").val(dept.detail)
            break ;
        }
    }
})
function updateDept(){
    //1、得到页面已经修改完的数据
   var name =  $("#name").val() ;
   var remark =  $("#remark").val() ;
   //2、遍历部门集合，找到修改的部门信息
   for(var i = 0 ; i < deptJsonArray.length ; i++){
       var dept = deptJsonArray[i] ;
       if(dept != undefined && dept.did == did ){
        dept.dname = name ;
        dept.remark = remark ;
        alert("修改成功")
        window.location.href = "deptlist.html"
        break ;
       }
   }

}
