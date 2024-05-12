//Index.vue
<script setup lang="ts">
import AsideNavBar from "@/components/AsideNavBar.vue";
import Header from "@/components/Header.vue";
import IndexMain from "@/components/IndexMain.vue";

</script>

<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width = 200px>
      <AsideNavBar></AsideNavBar>
    </el-aside>
    <el-container>
      <el-main>
        <div id="app">
          <Header></Header>
          <IndexMain></IndexMain>
        </div>
      </el-main>
    </el-container>
  </el-container>
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
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
}

.container {
  width: 90%; /* 调整宽度 */
  max-width: 1200px; /* 调整最大宽度 */
  height: 500px;
  margin-top: 20px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: flex-start; /* 垂直居上 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.container_statistics {
  width: 90%; /* 调整宽度 */
  max-width: 1200px; /* 调整最大宽度 */
  height: 180px;
  margin-top: 20px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: flex-start; /* 垂直居上 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.container_header {
  height: auto;
  width: 100%;
  margin-bottom: 5px;
}

button:hover {
  background-color: #0056b3;
}

.user_info{
  font-size: 15px;
  font-family: sans-serif;
}
</style>