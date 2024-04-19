/*
 * @Description: 
 * @Author: wl
 * @Date: 2024-03-22 10:37:32
 * @LastEditTime: 2024-03-29 09:20:19
 * @LastEditors: wl
 */
var deptJsonArray = window.parent.deptJsonArray
$(function(){
     deptList() ;
})
//全选功能
function checkA(){
    //1、得到全选复选框的选中状态
    var ischecked =  $("#checkAll").prop("checked") ;
    //2、得到所有的可以选择的复选框
     var alls = $("input[name='choice']") ;
     //3、修改所有的复选框的状态与全选复选框的状态保持一致
     for(var i = 0 ; i < alls.length ; i++){
        var all = alls[i] ;
        if($(all).parent().parent("tr").css("display")=="table-row"){
			$(all).prop("checked",ischecked);
		}
     }
}
//删除部门json
function  deleD(deptid){
    //遍历所有部门信息，查找当前ID值是否在部门信息中
    for(var i = 0 ; i < deptJsonArray.length ; i++){
        var dept = deptJsonArray[i] ;
        if(dept != undefined && dept.did == deptid){
            delete deptJsonArray[i]
            return 
        }
    }
}
//删除部门信息
function deleDept(){
    //1、得到所有选择了的部门组件
   var checkes =   $("input[name='choice']:checked") ;
   //2、判断用户是否已经选择数据
   if(checkes.length > 0){
    //已经选择了至少一条数据
    //3、判断用户是否真心想要删除
      var flag = window.confirm("你真的要删除了这些内容吗？")
      if(flag){
        //4、得到要删除的部门的ID值
        for(var i = 0 ; i < checkes.length ; i++){
            //得到每一个部门
            var deptid = checkes[i]
            var id = $(deptid).val() ;
            //5、根据ID值删除部门信息
            deleD(id)
        }
        //5、删除完成后，显示当前所有的部门
        deptList() ;
      }

   }else{
    alert("至少得选一个不要的呀！！！！")
   }

}
//跳转到回显页面
function showEdit(did){
    window.location.href = "showEdit.html?deptid=" + did ;
}
//显示部门信息
function deptList(){
    //将页面的内容清空
    $("#deptList").html("")
    //得到搜索的关键字
   var name =  $("#name").val() 
    //从json中读取到所有的部门信息
    for(var i = 0 ; i < deptJsonArray.length ; i++){
        var dept = deptJsonArray[i] ;
        //添加一个是否显示的标识
        var flag = false ;
        if(dept != undefined){
            //将当前的搜索关键字与部门中的部门名称进行比对
            if(dept.dname.indexOf(name) != -1){
                  //表示有此部门
                  flag = true ;
            }else{
                flag = false ;
            }
        }
        if(flag){
        //完成页面显示的内容
        var showDept = "<tr>"+
                          "<td>"+
                          "<input type='checkbox' name='choice'  value='"+dept.did+"'/>"+
                          "</td>"+
                          "<td>" + dept.dname + "</td>"+
                          
                          "<td>" + dept.detail + "</td>"+
                          "<td><img src='../img/update.gif' onclick='showEdit("+dept.did+")' />"+
                          "</td>"+
                        "</tr>" ;
         $("#deptList").append(showDept) ;
        }
    }
}