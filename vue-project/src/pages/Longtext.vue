<template>
    <el-container class="layout-container-demo" style="height: 100%">
      <el-aside width = 200px>
        <AsideNavBar></AsideNavBar>
      </el-aside>
      <el-container>
        <el-main>
          <div id="app">
            <Header></Header>
            <div class="text_container" ref="vantaRef">
                <LongtextBox></LongtextBox>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import {useRouter} from 'vue-router'
  import TranslateBox from '@/components/TranslateBox.vue'
  import {useUserstore} from '@/store/user'
  import { ElMessage } from 'element-plus';
  import  AsideNavBar  from '@/components/AsideNavBar.vue'
  import Header from '@/components/Header.vue'
  import LongtextBox from '@/components/LongtextBox.vue'
  import * as THREE from "three";
  import WAVES from "vanta/dist/vanta.waves.min";

  const userStore = useUserstore()
  const router = useRouter();
  const vantaRef = ref(null);
let vantaEffect: { destroy: () => void };
onMounted(() => {
  vantaEffect = WAVES({
    el: vantaRef.value,
    THREE: THREE,
    backgroundColor: 0xffffff,
  });
});

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }
});
  </script>
  
  <style scoped>
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
    height: 100%;
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
  
  .text_container {
    width: 90%; /* 调整宽度 */
    max-width: 1200px; /* 调整最大宽度 */
    height: 800px;
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