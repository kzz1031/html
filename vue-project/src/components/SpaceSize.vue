<template>
    <el-slider v-model="size" />
    <el-space wrap :size="size">
      <el-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>工作框</span>
            <!-- <el-button class="button" text>Operation button</el-button> -->
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '内容 ' + o }}
        </div>
      </el-card>
    </el-space>
    <el-button type="primary" style="margin-top: 16px; margin-left: 550px;" @click="saveSize">保存</el-button>
  </template>
  
  <script lang="ts" setup>
  import { useUserstore } from '@/store/user';
  import { ref } from 'vue'
  const userStore = useUserstore();
  const size = ref(20)
  function saveSize() {
    userStore.space = size.value; // 将当前 slider 的值保存到 userStore.space
    console.log(`Saved size: ${userStore.space}`);
  }
  
  
  </script>

<style>

.cards-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-evenly; 
}

.box-card {
  flex-grow: 1; 
}
</style>
  