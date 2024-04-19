<template>
    <el-form ref="ruleFormRef" :model="form" label-width="auto" style="max-width: 600px"  >
      <el-form-item label="会议室名称">
        <el-select v-model="form.meetingroom" class="m-2" placeholder="Select" @click="getmeetingrooms()">
    <el-option
      v-for="item in meetingrooms"
      :key="item.meetingroom"
      :label="item.meetingroom"
      :value="item.meetingroom"

    />
  </el-select>
      </el-form-item>
      <el-form-item label="会议名称">
        <el-input v-model="form.topic" />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select v-model="form.department" placeholder="请选择你的部门">
          <el-option label="信息学部" value="信息学部" />
          <el-option label="文法学部" value="文法学部" />
          <el-option label="城建学部" value="城建学部" />
          <el-option label="材制学部" value="材制学部" />
        </el-select>
      </el-form-item>
      <el-form-item label="会议日期">
        <el-col >
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>

      <el-form-item label="会议结束时间">
        <el-col :span="11">
          <el-time-picker
            v-model="form.starttime"
            placeholder="Pick a time"
            style="width: 100%"
            value-format = 'HH:mm'
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.endtime"
            placeholder="Pick a time"
            style="width: 100%"
            value-format = 'HH:mm'
          />
        </el-col>
      </el-form-item>

      <el-form-item label="人员组成">
        <el-tree-select
    v-model="value"
    :data="data"
    multiple
    :render-after-expand="false"
    @click="getusers()"
  />
  
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive,ref } from 'vue'
  import Service from '@/utils/axios'
  import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

import { toRaw } from "@vue/reactivity";
import { da } from 'element-plus/es/locale';
const ruleFormRef = ref<FormInstance>()

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
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
  // do not use same name with ref
  const form = reactive({
    topic: '',
    department: '',
    date: '',
    endtime: '',
    starttime: '',
    desc: '',
    meetingroom:'',
    
  })
  const submitForm = reactive({
    topic: '',
    department: '',
    desc: '',
    meetingroom:'',
    starttime: '',
    endtime: '',
  })


const meetingrooms=reactive([]);
var meetingroomsdataup=false
const getmeetingrooms= ()=>{
  if(meetingroomsdataup==false){
    Service.post('/getallroom', {
  },{
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(function (response) {
    for (let i = 0; i < response.data.length; i++) {
      meetingrooms.push(response.data[i]);
    }
    console.log(meetingrooms);
  })
  .catch(function (error) {
    console.log(error);
    open("网络出错")
  });
  }
  meetingroomsdataup=true;
}

const value = ref()

const data = ref(
  [
  {
    value: '信息学部',
    label: '信息学部',
    children: [
      
    ],
  },
  {
    value: '文法学部',
    label: '文法学部',
    children: [
      
    ],
  },
  {
    value: '艺术学部',
    label: '艺术学部',
    children: [
      
    ],
  },
  {
    value: '理学部',
    label: '理学部',
    children: [
      
    ],
  },
]
)


var usersdataup=false
const getusers= ()=>{
  if (!usersdataup) {
    Service.get('/user2')
      .then((response) => {
        for (let user of response.data) {
          const department = user.department;
          const childItem = {
            value: user.name, // 替换为实际存储用户唯一标识的字段名
            label: user.name, // 替换为实际存储用户显示名称的字段名
          };

          // 查找与用户部门匹配的 department 对象，并将用户添加到其 children 数组中
          const matchedDepartment = data.value.find((dept) => dept.value === department);
          if (matchedDepartment) {
            matchedDepartment.children.push(childItem);
          } else {
            console.warn(`未找到与用户部门 "${department}" 匹配的部门对象`);
          }
        }
        usersdataup = true;
      })
      .catch((error) => {
        console.log(error);
        open("网络出错");
      });
  }
}

const onSubmit = () => {
  console.log(form)
  console.log(value.value)
  // form.mamber=value
  Service.post('/Book_confirm', {
    topic: form.topic,
    department: form.department,
    description: form.desc,
    meetingroom:form.meetingroom,
    starttime: form.date.toISOString().slice(0,10)+" "+form.starttime,
    endtime: form.date.toISOString().slice(0,10)+" "+form.endtime,
  },{
  headers: {
      'Content-Type': 'application/json'
  }
  },)
  .then(function (response) {
    console.log(response);
    for(var i=0;i<value.value.length;i++){
      Service.post('/muinsert',{
        topic: form.topic,
    user: value.value[i],
    meetingroom:form.meetingroom,
  },{
  headers: {
      'Content-Type': 'application/json'
  }
  },).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log("内部");
    console.log(error);
})
    }
    open("创建成功")
  })
  .catch(function (error) {
    console.log(error);
    open("网络出错")
  });
  console.log('submit!')
}

  </script>
  