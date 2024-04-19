/*
 * @Description: 
 * @Author: wl
 * @Date: 2024-03-22 09:34:35
 * @LastEditTime: 2024-03-22 10:17:29
 * @LastEditors: wl
 */
//显示所有部门信息
function deptManage(){
    //修改激活状态
    checkMenu("deptSearch")
    //当点击此组件的时候就可以在iframe框架中显示页面
    $("#myFrame").attr("src" , "dept/deptlist.html")
}
//修改选中与未选中二级菜单的样式
function checkMenu(menu1){
    //得到当前选择中二级菜单组件
    var submenu = $(".sub-menu>li>a.subactive")
    //判断当前的组件是否是subactive活动组件
    if(submenu.text() != $("#" + menu1).text()){
        //如果当前点击的组件不是活动组件
        //修改之前的活动组件的父类组件效果
        $(submenu).parent().css("background","#35404D");
        //取消之前的活动效果
        $(submenu).removeClass("subactive")
        //将当前点击的组件修改为激活组件
        $("#" + menu1).attr("class" , "subactive") ;
        //修改激活组件的父组件样式
        $(menu1).parent().css("background","rgb(82 100 121)");

    }
    
}