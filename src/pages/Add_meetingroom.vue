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
      <el-form-item label="会议室名称" prop="meetingroom">
        <el-input v-model="ruleForm.meetingroom" />
      </el-form-item>
      <el-form-item label="会议室类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择会议类型">
          <el-option label="快速会议" value="quick" />
          <el-option label="预约会议" value="reserved" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="会议室创建时间" required>
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
  import Service from '@/utils/axios'
  import type { FormInstance, FormRules } from 'element-plus'
  
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

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
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    meetingroom: '',
    type: '',

    date: '',


    desc: '',
    free: "false",
  })

  
  const rules = reactive<FormRules>({
    meetingroom: [
      { required: true, message: '请输入会议室名称', trigger: 'blur' },
    ],
    type: [
      {
        required: true,
        message: '请选择会议室类型',
        trigger: 'change',
      },
    ],
    count: [
      {
        required: true,
        message: '请选择会议室部门',
        trigger: 'change',
      },
    ],
    date: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
      },
    ],

    desc: [
      { required: true, message: '请填写备注', trigger: 'blur' },
    ],
  })
  
  

  const submitForm = () => {
    ruleForm.date=ruleForm.date.toISOString().slice(0,10)
    Service.post('/Add_meetingroom_confirm', ruleForm,{
    headers: {
        'Content-Type': 'application/json'
    }
    },)
    .then(function (response) {
      console.log(response);
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
  

  </script>
  