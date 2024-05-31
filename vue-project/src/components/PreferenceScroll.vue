<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import type { DrawerProps } from 'element-plus'
import { ref, reactive, watch } from 'vue'
  const count = ref(0)
  const load = () => {
    count.value += 2
  }
import {useUserstore} from '@/store/user'

const userStore = useUserstore();
const input = ref('')
// 为每个项目创建一个反应式数组来存储输入数据
const inputs = reactive<Array<{ wish: string, translation: string }>>(
  Array.from({ length: count.value }, () => ({ wish: '', translation: '' }))
)

// 监听 count 的变化，适当地调整 inputs 数组的大小
watch(count, (newCount: number, oldCount: number) => {
  if (newCount > oldCount) {
    for (let i = oldCount; i < newCount; i++) {
      inputs.push({ wish: '', translation: '' })
    }
  }
})
const submitTranslations = () => {
  // 实现提交逻辑，如更新store或调用API
  ElMessageBox.alert('提交成功!', '信息', {
    confirmButtonText: '确定',
    type: 'success'
  })
}
</script>

<template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="(input, index) in inputs" :key="index" class="infinite-list-item">
      {{ index + 1 }}.
      我希望
      <el-input v-model="input.wish" style="width: 240px" placeholder="输入原始文本" />
      翻译成
      <el-input v-model="input.translation" style="width: 240px" placeholder="输入期待翻译" />
    </li>
    </ul>
    <!-- <button class="submit-button" @click="submitTranslations">提交</button> -->
</template>
  
<style>
  .infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
  }
  .infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
  }
</style>