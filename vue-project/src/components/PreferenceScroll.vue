<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import {Minus, Plus, Refresh, Edit, Delete, Share, CopyDocument, Star, CircleCheck} from '@element-plus/icons-vue'
import type { DrawerProps } from 'element-plus'
import { ref, reactive, watch, defineComponent, watchEffect, defineProps, onMounted, onUnmounted } from 'vue'
import { AdmitwishApi } from "@/request/api";
import emitter from "@/Mitt";
import { ElIcon } from 'element-plus';
import { Aim, Select } from '@element-plus/icons-vue';
const count = ref(0)
const load = () => {
    count.value += 2
}
import {useUserstore} from '@/store/user'
// 检查重复并添加或替换翻译
const userStore = useUserstore();
const input = ref('')
const newWish = ref('')
const newTranslation = ref('')
const rightclickwish = ref("");
// 为每个项目创建一个反应式数组来存储输入数据
const inputs = reactive<Array<{ wish: string, translation: string }>>(
  Array.from({ length: count.value }, () => ({ wish: '', translation: '' }))
)
const inputValue = ref('');
onMounted(() => {
  console.log('preferwish component mounted and listener set');
  emitter.on('prewish', (message) => {
    rightclickwish.value = message.wish;
    console.log(message.wish);
    updateInputs(rightclickwish.value);
  });
});

onUnmounted(() => {
  emitter.off('prewish', updateInputs);
});
const updateInputs = (newValue: string) => {
  const emptyIndex = inputs.findIndex(item => item.wish === '' && item.translation === '');
  
  if (emptyIndex === -1) {
    // If no empty slots, add new
    inputs.push({ wish: newValue, translation: '' });
  } else {
    // If empty slot exists, fill it
    inputs[emptyIndex].wish = newValue;
    inputs[emptyIndex].translation = '';
  }
};

const addTranslation = () => {
    if (!newWish.value || !newTranslation.value) {
        ElMessage.error("原始文本和翻译不能为空");
        return;
    }
    const duplicateIndex = inputs.findIndex(item => item.wish === newWish.value);
    if (duplicateIndex !== -1) {
        ElMessageBox.confirm(`"${inputs[duplicateIndex].wish}" 已有 "${inputs[duplicateIndex].translation}" 的内容，是否替换?`, '注意', {
            confirmButtonText: '是的',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            inputs[duplicateIndex].translation = newTranslation.value;
            console.log(newTranslation.value);  // 打印当前的翻译输入
            // inputs[duplicateIndex] = { ...inputs[duplicateIndex], translation: newTranslation.value };
            ElMessage.success("翻译已更新");
            newWish.value = ""; // 清空输入框
            newTranslation.value = ""; // 清空输入框
        }).catch(() => {
            ElMessage.info("更新已取消");
        });
    } else {
        // 找到第一个空条目的索引，如果不存在，则在末尾添加
        let emptyIndex = inputs.findIndex(item => !item.wish && !item.translation);
        if (emptyIndex === -1) {
            emptyIndex = inputs.length;
        }
        inputs.splice(emptyIndex, 1, { wish: newWish.value, translation: newTranslation.value });
        ElMessage.success("翻译已添加");
        newWish.value = ""; // 清空输入框
        newTranslation.value = ""; // 清空输入框
    }
};

// 监听 count 的变化，适当地调整 inputs 数组的大小
watch(count, (newCount: number, oldCount: number) => {
  if (newCount > oldCount) {
    for (let i = oldCount; i < newCount; i++) {
      inputs.push({ wish: '', translation: '' })
    }
  }
})

async function submitTranslations() {
  // let res = await admitwishApi({
  //       username: userStore.userName,
  //       wish: ["1", "87"],
  //       translation: ["2", "90"],
  //     })
  // 过滤掉任何一个字段为空的条目
  const filteredInputs = inputs.filter(input => input.wish.trim() && input.translation.trim());
  // 收集所有 wish 和 translation
  const wishes = filteredInputs.map(input => input.wish);
  const translations = filteredInputs.map(input => input.translation);
  // 如果过滤后没有任何条目，显示错误消息并返回,还没有达到过滤空的效果
  if (filteredInputs.length === 0) {
      ElMessage.error("没有有效的翻译对提交，请确保所有字段均已填写。");
      return; // 停止执行函数
  }
  try {
        const res = await AdmitwishApi({
            username: userStore.userName,
            wish: wishes,
            translation: translations
        });
        // 处理响应
        if (res.success) {
            ElMessage.success("翻译偏好已成功保存!");
            console.log('API Response:', res);
            console.log('Saved translations:', res.result);
        } else {
            throw new Error(res.msg || '未知错误');
        }
    } catch (error) {
        console.error('Error submitting translations:', error);
        ElMessage.error("提交翻译偏好时出错:" );
    }
}
</script>

<template>
  <div class="centered-container" @mouseup="handleMouseUp"></div>
  <div class="translate-preferences-header">
    <span>字词翻译偏好</span>
    <el-button type="primary" :icon="CircleCheck" @click="submitTranslations">保存字词翻译偏好</el-button>
  </div>
  <div class="centered-container">
    <div>
      我希望
      &nbsp;&nbsp;&nbsp;
      <el-input v-model="newWish" placeholder="输入原始文本" style="width: 240px"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      翻译成
      &nbsp;&nbsp;&nbsp;
      <el-input v-model="newTranslation" placeholder="输入期待翻译" style="width: 240px"></el-input>
      <el-button class="move-right" type="primary" @click="addTranslation">添加</el-button>
    </div>
  </div>
  <div class="centered-container">
    <span class="text">原文</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <span class="text">译文</span>
  </div>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li v-for="(input, index) in inputs" :key="index" class="infinite-list-item">
        {{ index + 1 }}.
        &nbsp;&nbsp;&nbsp;
        <el-input v-model="input.wish" style="width: 240px" placeholder="输入原始文本" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input v-model="input.translation" style="width: 240px" placeholder="输入期待翻译" />
        &nbsp;&nbsp;&nbsp;
        <el-icon v-if="input.wish && input.translation"><Select /></el-icon>
        <el-icon v-else><Aim /></el-icon>
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
  .centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .move-right {
    margin-left: 20px; /* 可以根据需要调整这个值 */
  }
  .translate-preferences-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: -20px;  /* 向上移动20像素 */
  }
  .centered-container div {
  font-family: 'Microsoft YaHei', sans-serif; /* Fallback to sans-serif if Microsoft YaHei is not available */
}
</style>