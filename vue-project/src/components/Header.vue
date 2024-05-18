<script setup lang="ts">
import {ElMessage, ElNotification as notify} from 'element-plus'
import {Menu as Setting} from '@element-plus/icons-vue'
import {User} from '@element-plus/icons-vue'
import {LogoutApi} from "@/request/api";
import {useUserstore} from '@/store/user'
import {useRouter} from 'vue-router'

const userStore=useUserstore()
const router = useRouter()

async function logout() {
  let res = await LogoutApi()
  if (res.success) {
    ElMessage.success("登出成功")
    userStore.userName = '请登录'
    console.log(userStore.userName)
    await router.push('/')
  } else {
    ElMessage("登出失败")
  }
  console.log(res)
}
function  jumptoLogin(){
  router.push('/login');
}

</script>

<template>
  <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar" style="float: left;">
          <el-link href="https://github.com/kzz1031/html" style="font-size: 25px; font-weight: bold; color: #4a90e2; font-family: 'Arial', sans-serif;">
            GPT-TRANSLATOR
          </el-link>
          <el-link href="/Test">TEST</el-link>
        </div>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px;" size = 20px ><User/></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click = 'jumptoLogin()' >Login in</el-dropdown-item>
                <el-dropdown-item @click = 'logout()'>Log out</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-tag type="primary" size="large" style="font-size: 15px;">{{ userStore.userName }}</el-tag>
        </div>
      </el-header>
</template>

<style scoped>
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  height: 100%;
}
.el-menu {
  border-right: none;
}
.el-main {
  padding: 0;
}
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
