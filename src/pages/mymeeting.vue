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
    props: ['id'],
 
    setup(props) {

      const tableData = ref([]); 
      const fetchData = () => {
        console.log(props.id);
        Service.get("/getoneuser/"+props.id,{
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res.data.name);
    Service.get("/getusermeeting/"+res.data.name,{
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res1 => {
    for (let i = 0; i < res1.data.length; i++){
        console.log(res1.data[i]);
        Service.get("/selectmeet/"+res1.data[i],{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res2 => {
        console.log(res2.data);
        tableData.value.push(res2.data)
        
       
      }).catch(err => {
        console.log(err);
      });
    }
  });
    
  }).catch(err => {
    console.log(err);
  });
      };
  
      // 组件挂载后获取数据
      onMounted(fetchData);
     
  
      // 返回响应式数据供模板使用
      return {
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
  