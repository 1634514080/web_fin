<template>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="会议名称" prop="topic" />
    <el-table-column label="会议开始时间" prop="starttime" />
    <el-table-column label="会议结束时间" prop="endtime" />
    <el-table-column label="会议所属部门" prop="department" />
    <el-table-column label="会议室名称" prop="meetingroom" />
    <el-table-column label="会议是否通过审批" prop="approval" />
  <el-table-column label="会议是否结束" prop="finished" />
    <el-table-column label="备注" prop="description" />
      <el-table-column align="right">
    <template #default="scope">
      <el-button
        size="small"
        type="danger"
        @click="deleteRow(scope.$index)"
        >删除</el-button
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

export default {
    components: {
    ElTable,
    ElTableColumn,
  },
  setup() {
    const deleteRow = (index) => {
        console.log(index)
        console.log(tableData.value[index].meetingid) 
        Service.delete("/delmeeting/"+tableData.value[index].meetingid).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        tableData.value.splice(index, 1)

}
    const tableData = ref([]); 
    const fetchData = () => {
        Service.get('/allMeeting')
        .then(response => {
          tableData.value = response.data; // 将请求得到的数据赋值给 tableData
        })
        .catch(error => {
          console.error('请求失败:', error);
        });
    };

    // 组件挂载后获取数据
    onMounted(fetchData);
   

    // 返回响应式数据供模板使用
    return {
        deleteRow,
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
