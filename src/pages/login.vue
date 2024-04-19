<template>
    <div class="login">
      <el-container >
        <el-header class="login-header">
            <span style="color: #34495E;font-weight: bold;font-size: larger;">SmartMeeting</span>
             <span style="color: black;margin-left: 10px;font-size: medium;">会议管理系统</span>
        </el-header>
        <el-main class="login-main" >
        <div class="login-form">
            <el-tabs v-model="activeName" stretch=true style="text-align: center;" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="账号密码登录" name="first">
                    <el-form
                        ref="ruleFormRef"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        label-width="120px"
                        style="width: 500px;text-align: center;padding-top: 20px;"
                    >
                <el-form-item label="账号" prop="pass">
                <el-input v-model="ruleForm.pass" autocomplete="off" placeholder="请输入账号"/>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                <el-input
                    v-model="ruleForm.checkPass"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                />
                </el-form-item>
                
                <el-form-item >
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="记住密码" />
                        <el-checkbox label="自动登录" />
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitForm()"
                    >登录</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                </el-form-item>
            </el-form>
                </el-tab-pane>
                


                <el-tab-pane label="手机号登录" name="second">
                    <el-form
                        ref="ruleFormRef"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        label-width="120px"
                        style="width: 500px;text-align: center;padding-top: 20px;"
                    >
                <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" type="text" autocomplete="off" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                <el-input
                    v-model="ruleForm.checkPass"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                />
                </el-form-item>
                
                <el-form-item >
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="记住密码" />
                        <el-checkbox label="自动登录" />
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitForm()"
                    >登录</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                </el-form-item>
            </el-form>
                </el-tab-pane>
            </el-tabs>
            
        </div>
        </el-main>
        <el-footer class="login-footer">
        <span style="margin-top: 5px;color: #909497  ;">使用本系统造成的损失，概不负责</span>
        </el-footer>
      </el-container>
    </div>
  </template>

<style scoped>
    @import "./css/login.css";
</style>


<script lang="ts" setup>

import type { TabsPaneContext } from 'element-plus'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// import router from "@/router"
import Service from '@/utils/axios'
const checkList = ref(['remambered', 'auto_login'])
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {}

const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('账号不可为空'))
  } else {
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不可为空'))
  } else {
    callback()
  }
}

const validatePass3 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('手机号不可为空'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  phone:'',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  phone: [{ validator: validatePass3, trigger: 'blur' }],

})

import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const open = (s) => {
  ElMessageBox.alert(s, '错误', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

const submitForm = () => {
  Service.post('/confirm', {
    uid: ruleForm.pass,
    password: ruleForm.checkPass,
    phone:ruleForm.phone,
    remamber:checkList.value[0],
    auto_login:checkList.value[1]
  },{
    headers: {
        'Content-Type': 'application/json'
    }
    },)
  .then(function (response) {
    console.log(response);
    if (response.data==true){
      router.push({ path: 'admin', query: { userId: ruleForm.pass }})
        }else{
      open("账号或密码错误")
    }
  })
  .catch(function (error) {
    console.log(error);
    open("网络出错")
  });
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>