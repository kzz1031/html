<template>
  <div class="slider-demo-block">
    <el-slider v-model="userStore.translate_style" show-stops :max="4" />
    <div style="width: 200px;">
      <el-tag style="margin-left: 15px;">
      {{ currentValue }}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useUserstore } from '@/store/user';
const userStore = useUserstore();
const value = ref(2);
const options = ['口语', '较口语', '正常', '较正式', '正式'];

const currentValue = computed(() => options[userStore.translate_style]);
</script>

<style scoped>
.slider-demo-block {
  max-width: 300px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
