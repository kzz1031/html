<template>
    <el-slider v-model="size" />
    <el-space wrap :size="size">
      <el-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <el-button class="button" text>Operation button</el-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </el-card>
    </el-space>
  </template>
  
  <script lang="ts" setup>
  import { useUserstore } from '@/store/user';
import { ref } from 'vue'
const userStore = useUserstore();
  const size = ref(20)
  // userStore.space = size;
  
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
  