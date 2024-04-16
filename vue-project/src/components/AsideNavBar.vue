//AsideNavBar.vue
<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const router = useRouter()

function change(key: string, keyPath: string[]) {
  console.log(key)
}
</script>

<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :router=true
  >
    <el-menu-item index="/index/">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span>个人信息</span>
    </el-menu-item>
    <el-menu-item index="/index/checkUserInfo">
      <el-icon>
        <document/>
      </el-icon>
      <span>查看用户信息</span>
    </el-menu-item>
    <el-menu-item index="/index/addUser">
      <el-icon>
        <setting/>
      </el-icon>
      <span>添加用户</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
</style>