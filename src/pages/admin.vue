
<template>
    <div class="common-layout">
        <el-container>
        <el-header class="login-header">
            <span>
                <span  style="color: #34495E;font-weight: bold;font-size: larger;">SmartMeeting</span>
                <span style="color: black;margin-left: 10px;font-size: medium;">会议管理系统</span>
            </span>
            <el-dropdown style="margin-left: auto;">
                <el-avatar  :size="50" :src="circleUrl" />
                <template #dropdown>
                <el-dropdown-menu
                router
                :default-active="$router.path"

                >
                    <el-dropdown-item >修改密码</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    <!-- <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item> -->
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>

        <el-container>
            <el-aside width="200px" height="90vh">
                <el-menu
                    router
                    :default-active="$router.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    style="height: 90vh;"
                >
                    <el-menu-item :index="`/admin/user?id=${Id}`">
                        <el-icon><User /></el-icon>
                        <span >个人中心</span>
                    </el-menu-item>
                    <el-sub-menu index="1">
                    <template #title>
                        <el-icon><Bell /></el-icon>                        
                        <span>个人通知</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="`/admin/test?id=${Id}`" style="display: none;">最新通知</el-menu-item>
                        <el-menu-item :index="`/admin/mymeeting?id=${Id}`">我的会议</el-menu-item>
                        <el-menu-item :index="`/admin/mybooking?id=${Id}`">我的预定</el-menu-item>
                    </el-menu-item-group>
                    </el-sub-menu>

                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><OfficeBuilding /></el-icon>
                        <span>人员管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="`/admin/department_man?id=${Id}`" style="display: none;">部门管理</el-menu-item>
                        <el-menu-item :index="`/admin/Employee_registration?id=${Id}`">员工注册</el-menu-item>
                        <el-menu-item :index="`/admin/member?id=${Id}`">员工信息</el-menu-item>
                        <el-menu-item :index="`/admin/Search_employees?id=${Id}`">搜索员工</el-menu-item>
                    </el-menu-item-group>
                    </el-sub-menu>

                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon><DataAnalysis /></el-icon>
                        <span>会议管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="`/admin/Add_meetingroom?id=${Id}`">添加会议室</el-menu-item>
                        <el-menu-item :index="`/admin/View_meetingroom?id=${Id}`">查看会议室</el-menu-item>
                        <el-menu-item :index="`/admin/Book_meeting?id=${Id}`">预定会议</el-menu-item>
                        <el-menu-item :index="`/admin/search_meeting?id=${Id}`">搜索会议</el-menu-item>
                        <el-menu-item :index="`/admin/meeting_statistics?id=${Id}`">会议统计</el-menu-item>
                        <el-menu-item :index="`/admin/Registration_approval?id=${Id}`">会议审批</el-menu-item>
                        
                    </el-menu-item-group>
                    </el-sub-menu>

                    
                </el-menu>
            </el-aside>
            <el-main>
                <router-view :id="Id"></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>


<style>
 @import "./css/admin.css";
 .example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>
<script setup>
   import { ArrowDown } from '@element-plus/icons-vue';
   
   import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
   import router from "@/router"
   import { useRoute } from 'vue-router'
   const route = useRoute()
   const Id=route.query.userId;
    console.log(Id)
   //首先在setup中定义

    // 定义handleOpen函数
    function handleOpen(key, keyPat) {
    }

    // 定义handleClose函数
    function handleClose(key, keyPath) {
        }
    const logout=()=>{
        router.push('/')
    }
</script>