<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="formInline.name" placeholder="姓名" clearable />
    </el-form-item>
    <el-form-item label="性别">
      <el-select
        v-model="formInline.sex"
        placeholder="请选择"
        clearable
      >
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>
    <el-form-item label="入校日期">
      <el-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="选择日期"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" style="width: 100%">
  <el-table-column fixed prop="date" label="注册日期" min-width="16%" />
  <el-table-column prop="name" label="员工姓名" min-width="16%" />
  <el-table-column prop="age" label="年龄" min-width="16%" />
  <el-table-column prop="department" label="部门" min-width="16%" />
  <el-table-column prop="sex" label="性别" min-width="16%" />
  <el-table-column prop="role" label="权限" min-width="16%" />
  <!-- <el-table-column fixed="right" label="操作" min-width="16%">
    <template #default>
      <el-button link type="primary" size="small" @click="handleClick"
        >更多</el-button
      >
      <el-button link type="primary" size="small">编辑</el-button>
    </template>
  </el-table-column> -->
</el-table>
  </div>
  

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


const handleClick = () => {
console.log('click')
}

const tableData = reactive([])

const formInline = reactive({
    name: '',
    sex: '',
    date: '',
  })
  
  const onSubmit = () => {
    tableData.length=0
    if (formInline.date!=''){
      formInline.date=formInline.date.toString()
    }
    Service.post('/Search_employees_confirm', formInline,{
    headers: {
        'Content-Type': 'application/json'
    }
    })
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
