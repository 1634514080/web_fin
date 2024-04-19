/*
 * @Description: 
 * @Author: wl
 * @Date: 2024-03-15 10:31:36
 * @LastEditTime: 2024-03-22 09:17:30
 * @LastEditors: wl
 */
$(function(){
   //修改页面中的登录信息
   $("#showName").html("欢迎" + loginEmploy.name + "登录本系统") 
   //修改页面的时间显示信息
   setInterval(function(){
    $("#showTime").html(getTime() , 1000)  
   })
   //完成菜单栏的显示效果
   //将.active激活状态下的一级菜单设置为自动高度
   $(".active").css("height"  ,"auto")
   //修改活动菜单下的子菜单的颜色
   $(".active").children(".sub-menu").css("background" , "#35404D") ;
   //修改活动二级菜单的父类组件的背景以及文字颜色
   $(".subactive").parent().css("background" , "rgb(82 100 121)").css("color" ,"white")
   //添加一级菜单的点击事件
   $(".menu>li>a").click(function(){
      //得到当前组件的显示状态
      var display =  $(this).siblings(".sub-menu").css("display") ;
      //根据是否已经显示修改状态
      if(display == "none"){
         //如果没有显示，则设置状态为显示
         $(this).siblings(".sub-menu").show() ;
      }else{
         //如果现在是显示状态，则设置状态为隐藏
         $(this).siblings(".sub-menu").hide() ;
      }
      //修改父组件的高度
      $(this).parent().css("height"  ,"auto")
      //修改二级组件的背景颜色
      $(this).siblings(".sub-menu").css("background" , "#35404D") 
      //去掉下划线
      $(this).css("text-decoration" , "none")     
   })
    //给二级菜单添加点击事件，去掉下划线
    $(".sub-menu>li>a").click(function(){
      $(this).css("text-decoration" , "none")
   })
   //当鼠标移入到二级菜单的时候，修改父组件的样式
   $(".sub-menu>li>a").mouseover(function(){
      $(this).parent().css("background" , "rgb(82 100 121)").css("color" ,"white")
   })
   //当鼠标移开的时候，修改父组件样式
   $(".sub-menu>li>a").mouseout(function(){
     if(!$(this).hasClass("subactive")) {
      $(this).parent().css("background" , "#35404D") 
     }
   })
})