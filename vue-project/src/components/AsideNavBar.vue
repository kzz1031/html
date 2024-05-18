//AsideNavBar.vue
<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Setting,
  Search,
  House,
  Star,
  HomeFilled
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {useUserstore} from '@/store/user'

import { ElMessage } from 'element-plus';

const userStore=useUserstore()
const router = useRouter()

function change(key: string, keyPath: string[]) {
  console.log(key)
}
function jumptoHistory(){
  if(userStore.userName === '请登录') ElMessage("用户未登录");
  else router.push('/history')
}

function jumptoMain(){
  router.push('/')
}

function jumptoCollection(){
  if(userStore.userName == '请登录') ElMessage("用户未登录")  
  else router.push('/collect')
}

function jumptoUser() {
  if(!userStore.is_superuser) ElMessage.error("您还不是超级管理员")
  else{
    ElMessage.success("您已进入管理员空间")
    router.push('/index')
  }
}

function jumptoUserInfo() {
  console.log ("userinfo")
  router.push('/userinfo')
}
</script>

<template>
  <el-aside width="200px">
      
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon size="20"><HomeFilled /></el-icon><el-text size="large">导航栏</el-text>
            </template>
              <el-menu-item index="1-1" @click="jumptoMain()">主界面<el-icon><House /></el-icon></el-menu-item>
              <el-menu-item index="1-2" @click="jumptoHistory()">历史记录查询<el-icon><Search /></el-icon></el-menu-item>
              <el-menu-item index="1-3" @click="jumptoCollection()">收藏<el-icon><Star /></el-icon></el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Setting /></el-icon><el-text size="large">设置</el-text>
            </template>
              <el-menu-item index="2-1" @click="jumptoUserInfo()">查看用户信息</el-menu-item>
              <el-menu-item index="2-2" @click="jumptoUser()">管理员</el-menu-item>
          </el-sub-menu>
         
        </el-menu>
      </el-scrollbar>
    </el-aside>
</template>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  height: 100%;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>