<template>
    <div>
      快速指南
    </div>
  
    <TestComp></TestComp>
    <el-dropdown>
      <span class="el-dropdown-link">
        Dropdown List
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          
          <el-button>ssss</el-button>
          <textarea></textarea>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div>
      <el-button @click="jumptoMain"></el-button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ArrowDown } from '@element-plus/icons-vue'
  import router from '@/router';
  import TestComp from '@/components/Testcomp.vue'
  
  function jumptoMain(){
    router.push('/');
  }
  </script>
  <style scoped>
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  </style>