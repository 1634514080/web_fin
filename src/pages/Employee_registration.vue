<template>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
    <el-form-item label="账号" prop="user">
      <el-input v-model="ruleForm.user" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select-v2
          v-model="ruleForm.department"
          placeholder="部门"
          :options="options"
        />
      </el-form-item>
      <el-form-item label="权限" required prop="role">
        <el-radio-group v-model="ruleForm.role" class="ml-4">
      <el-radio label="管理员" size="large">管理员</el-radio>
      <el-radio label="用户" size="large">用户</el-radio>
    </el-radio-group>
      </el-form-item>
       <el-form-item label="入校时间" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
     
      
      <el-form-item label="备注" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">
          创建
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import Service from '@/utils/axios'
  
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const open = (s) => {
  ElMessageBox.alert(s, '通知', {
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
  interface RuleForm {
    name: string
    age: string
    department: string
    date: string
    sex: string
    desc: string
    user: string
    password: string
    role:string
    phone:string
  }
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    name: '',
    age: '',
    department: '',
    date: '',
    sex: '',
    desc: '',
    user:'',
    password:'',
    role:'',
    phone:''
  })
  
  
  const rules = reactive<FormRules<RuleForm>>({
    user: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'change',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change',
      },
    ],
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
     
    ],
    phone:[
      {
        required: true,
        message: '请输入手机号',
        trigger: 'change',
      },
    ],
    age: [
      {
        required: true,
        message: '请输入年龄',
        trigger: 'change',
      },
    ],
    department: [
      {
        required: true,
        message: '请选择部门',
        trigger: 'change',
      },
    ],
    date: [
      {
        type: 'date',
        required: true,
        message: '请选择一个日期',
        trigger: 'change',
      },
    ],
   
    
    sex: [
      {
        required: true,
        message: '请选择性别',
        trigger: 'change',
      },
    ],
    desc: [
      { required: true, message: '请输入备注', trigger: 'blur' },
    ],
  })
  
  const submitForm = () => {
    Service.post('/insert', {
      name: ruleForm.name,
      age: ruleForm.age,
      department: ruleForm.department,
      date: ruleForm.date.toISOString().slice(0,10),
      sex: ruleForm.sex,
      desc: ruleForm.desc,
      uid: ruleForm.user,
      password: ruleForm.password,
      role: ruleForm.role,
      phone: ruleForm.phone,
    },{
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(function (response) {
      if (response.data==true){
        open("创建成功")
      }else{
        open("创建失败，请重试")
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
  
  const options = [
  {
    value: '信息学部',
    label: '信息学部',
  },
  {
    value: '文法学部',
    label: '文法学部',
  },
  {
    value: '艺术学部',
    label: '艺术学部',
  },
  {
    value: '理学部',
    label: '理学部',
  },
  
]
  </script>
  