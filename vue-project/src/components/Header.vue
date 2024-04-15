<script setup lang="ts">
import {ElMessage, ElNotification as notify} from 'element-plus'
import {LogoutApi} from "@/request/api";
import {useRouter} from 'vue-router'
const router = useRouter()
async function logout() {
  let res = await LogoutApi()
  if (res.success) {
    ElMessage.success("登出成功")
    await router.push('/')
  } else {
    ElMessage("登出失败")
  }
  console.log(res)
}
</script>

<template>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <img src="https://img2.imgtp.com/2024/04/05/DMHKG7pg.jpg" alt="Logo" style="height: 50px;">
    <div>
      <el-button type="info" @click="logout">登出</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>