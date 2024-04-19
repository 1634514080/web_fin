<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="会议名称">
      <el-input v-model="formInline.topic" placeholder="会议名称"  />
    </el-form-item>
    <el-form-item label="会议所属部门">
      <el-select
        v-model="formInline.department"
        placeholder="请选择"
        
      >
        <el-option label="信息学部" value="信息学部" />
        <el-option label="文法学部" value="文法学部" />
        <el-option label="艺术学部" value="艺术学部" />
        <el-option label="理学部" value="理学部" />
      </el-select>
    </el-form-item>
    <el-form-item label="会议日期">
      <el-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="选择日期"
    
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" style="width: 100%">
  <el-table-column label="会议名称" prop="topic" />
  <el-table-column label="会议室名称" prop="meetingroom" />
  <el-table-column label="会议开始时间" prop="starttime" />
  <el-table-column label="会议结束时间" prop="endtime" />
  <el-table-column label="会议所属部门" prop="department" />
  <el-table-column label="会议是否通过审批" prop="approval" />
  <el-table-column label="会议是否结束" prop="finished" />

</el-table>

</template>

<script lang="ts" setup>
import { reactive } from 'vue'
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

const formInline = reactive({
  topic: '',
  department: '',
  date: '',
})
const tableData = reactive([])

const onSubmit = () => {
  tableData.length=0
    if (formInline.date!=''){
      formInline.date=formInline.date.toString()
    }
  Service.post('/search_meeting', formInline,{headers: { 'Content-Type': 'application/json' }})
  .then(function (response) {
    console.log(response);
    for (let i=0 ; i<response.data.length ; i++){
      tableData.push(response.data[i])
    }
  })
  .catch(function (error) {
    console.log(error);
    open("网络出错")
  });
    
  console.log('submit!')
}


</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
