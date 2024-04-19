<template>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="会议名称" prop="topic" />
    <el-table-column label="会议开始时间" prop="starttime" />
    <el-table-column label="会议结束时间" prop="endtime" />
    <el-table-column label="会议所属部门" prop="department" />
    <el-table-column label="会议室名称" prop="meetingroom" />
   
    <el-table-column label="备注" prop="description" />
      <el-table-column align="right">
    <template #default="scope">
      <el-button
        size="small"
        type="success"
        @click="passRow(scope.$index)"
        >通过</el-button
      >
      <el-button
        size="small"
        type="danger"
        @click="returnRow(scope.$index)"
        >驳回</el-button
      >
    </template>
  </el-table-column>
</el-table>

</template>

<script lang="ts">




import { reactive } from 'vue'
import Service from '@/utils/axios'
import { ref, onMounted } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const open = (s) => {
  ElMessageBox.alert(s, '通知', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
   
  })
}
export default {
    components: {
    ElTable,
    ElTableColumn,
  },
  setup() {
    const passRow = (index) => {
        console.log(index)
        console.log(tableData.value[index])
        tableData.value[index].approval = 'true' 
        console.log(tableData.value[index])
        Service.put("meetingupdata",tableData.value[index],{headers:{
            'Content-Type': 'application/json'
        }}).then(res => {
            console.log(res)
            open("审批通过")
        }).catch(err => {
            console.log(err)
            open("网络错误")
        })
        tableData.value.splice(index, 1)
}

const returnRow = (index) => {
  console.log(index)
        console.log(tableData.value[index])
        tableData.value[index].approval = 'true' 
        console.log(tableData.value[index])
        Service.put("meetingupdataf",tableData.value[index],{headers:{
            'Content-Type': 'application/json'
        }}).then(res => {
            console.log(res)
            open("审批驳回")
        }).catch(err => {
            console.log(err)
            open("网络错误")
        })
        tableData.value.splice(index, 1)
}

    const tableData = ref([]); 
    const fetchData = () => {
        Service.get('/allMeeting')
        .then(response => {
          // 创建一个新的数组，仅包含 approval 为 "false" 的数据项
      const filteredData = response.data.filter((item) => item.approval === 'false');

tableData.value = filteredData; // 将过滤后的数据赋值给 tableData
        })
        .catch(error => {
          console.error('请求失败:', error);
        });
    };

    // 组件挂载后获取数据
    onMounted(fetchData);
   

    // 返回响应式数据供模板使用
    return {
      passRow,
      returnRow,
      tableData,
    };
  },
 
 
};
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
