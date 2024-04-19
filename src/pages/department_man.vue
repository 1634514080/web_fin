<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="部门名称" prop="date" />
    <el-table-column label="部门负责人" prop="name" />
    <el-table-column label="部门人数" prop="num" />
    <el-table-column label="联系方式" prop="con" />

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface User {
  date: string
  name: string
  con:string
  num: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
{
    date: '信息学部',
    name: '张三',
    num: '1739',
    con: '13001',
  },
  {
    date: '文法学部',
    name: '李四',
    num: '720',
    con: '13002',
  },
  {
    date: '城建学部',
    name: '王五',
    num: '2035',
    con: '13003',
  },
  {
    date: '理学部',
    name: '刘二',
    num: '153',
    con: '13004',
  },
]
</script>
