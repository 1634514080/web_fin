<template>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="注册日期" min-width="16%" />
    <el-table-column prop="name" label="员工姓名" min-width="16%" />
    <el-table-column prop="age" label="年龄" min-width="16%" />
    <el-table-column prop="department" label="部门" min-width="16%" />
    <el-table-column prop="sex" label="性别" min-width="16%" />
    <el-table-column prop="role" label="权限" min-width="16%" />
    <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            Remove
          </el-button>
        </template>
    </el-table-column>
    </el-table>
</template>
<script>
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
        console.log(tableData.value[index].uid) 
        Service.delete("/del/"+tableData.value[index].uid).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        tableData.value.splice(index, 1)

}
    const tableData = ref([]); 
    const fetchData = () => {
        Service.get('/user2')
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