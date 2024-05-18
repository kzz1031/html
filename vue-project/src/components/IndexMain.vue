<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {GetUserInfoByPageNum} from "@/request/api";
import { Delete,Edit } from "@element-plus/icons-vue";

interface User {
  userName: string
  first_name: string
  last_name: string
  email: string
}

const tableData = ref<User[]>([]);

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(100);

onBeforeMount(async () => {
  let res = await GetUserInfoByPageNum({
    pageNumber: 1
  })
  res.users.forEach(item => {
    tableData.value.push({
      userName: item.username,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email
    });
  });
  total.value = res.total_users
  console.log('total_pages.value:',total.value)
})


const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchData();
};
const fetchData = async () => {
  // 在这里调用 API 获取数据，使用 currentPage 作为参数
  let res = await GetUserInfoByPageNum({
    pageNumber: currentPage.value
  })
  tableData.value=[]
  res.users.forEach(item => {
    tableData.value.push({
      userName: item.username,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email
    });
  });
  total.value = res.total_users
};


</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="userName" label="用户名" width="180"/>
        <el-table-column prop="first_name" label="姓" width="180"/>
        <el-table-column prop="last_name" label="名" width="180"/>
        <el-table-column prop="email" label="邮箱"/><!--
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button @click="console.log(scope.row, scope.$index);" link type="primary" size="large">
              <el-icon><Delete @click="handleCurrentChange"/></el-icon>
            </el-button>
            <el-button link type="primary" size="large">
              <el-icon><Edit /></el-icon>
            </el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </el-col>
  </el-row>

  <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
  />

</template>

<style scoped>

</style>