<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="会议室名称">
      <el-input v-model="formInline.meetingroom" placeholder="会议室名称"  />
    </el-form-item>
    <el-form-item label="会议室类型">
      <el-select
        v-model="formInline.type"
        placeholder="请选择"
      >
        <el-option label="快速会议" value="quick" />
        <el-option label="预约会议" value="reserved" />
      </el-select>
    </el-form-item>
    <el-form-item label="空闲状态">
      <el-select
        v-model="formInline.free" 
        placeholder="请选择"
      >
        <el-option label="空闲" value="true" />
        <el-option label="使用中" value="false" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" :style="{ display: s.show }">
  <el-table-column fixed prop="meetingroom" label="会议室名称" min-width="25%" />
  <el-table-column prop="type" label="会议室类型" min-width="25%" />
  <el-table-column prop="date" label="会议室创建时间" min-width="25%" />
  <el-table-column prop="free" label="空闲状态" min-width="25%" />
  <el-table-column prop="descr" label="备注" min-width="25%"/>
  
</el-table>

</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import Service from '@/utils/axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

import { toRaw } from "@vue/reactivity";

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
const s=reactive({show:"none"})
const formInline = reactive({
  meetingroom: '',
  type: '',
  free: '',
})
const tableData=reactive([

])
const onSubmit = () => {
  s.show=""
  tableData.length  = 0
  console.log(formInline)
  Service.post('/View_meeting_confirm', {
    meetingroom: formInline.meetingroom,
    type: formInline.type,
    free: formInline.free,
  },{
  headers: {
      'Content-Type': 'application/json',
    }
    })
  
  .then(function (response) {
    console.log(response.data);
console.log(toRaw(response.data));
for (let i = 0; i < response.data.length; i++) {
  tableData.push(response.data[i]);
}
console.log(tableData);
  })
  .catch(function (error) {
    console.log(error);
    open("网络出错")
  });
    
  console.log('submit!')
}

const handleClick = () => {
console.log('click')
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
