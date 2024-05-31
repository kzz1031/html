<template>
    <el-radio-group v-model="direction">
      <el-radio value="ltr">左侧显示</el-radio>
      <el-radio value="rtl">右侧显示</el-radio>
      <el-radio value="ttb">上方显示</el-radio>
      <el-radio value="btt">下方显示</el-radio>
    </el-radio-group>
  
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      保存 <!-- open    把这个按钮当作确认这个类型 -->
    </el-button>
    <!-- <el-button type="primary" style="margin-left: 16px" @click="drawer2 = true">
      with footer
    </el-button> -->
  
    <el-drawer
      v-model="drawer"
      title="字词翻译"
      :direction="direction"
      :before-close="handleClose"
      :userStore.direction = "direction"
    >
      <span>您好，这个弹出位置可以吗？</span>
    </el-drawer>
    <el-drawer v-model="drawer2" :direction="direction">
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        <div>
          <el-radio v-model="radio1" value="Option 1" size="large">
            Option 1
          </el-radio>
          <el-radio v-model="radio1" value="Option 2" size="large">
            Option 2
          </el-radio>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </template>
  
  <script lang="ts" setup>
  import { ElMessageBox } from 'element-plus'
  import type { DrawerProps } from 'element-plus'
  import { ref, watch } from 'vue';
  import {useUserstore} from '@/store/user'
  
  const userStore = useUserstore();
  const olddirection = ref(userStore.direction); // 从 store 获取当前方向

  const drawer = ref(false)
  const drawer2 = ref(false)
  const radio1 = ref('Option 1')
  const direction = ref<DrawerProps['direction']>('rtl')
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('您确定要关闭吗?', '确认操作', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
  function cancelClick() {
    drawer2.value = false
  }
  function confirmClick() {
    ElMessageBox.confirm(`您确定要选择 ${radio1.value} ?`, '确认操作', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
      .then(() => {
        drawer2.value = false
      })
      .catch(() => {
        // catch error
      })
  }
  // 确保 Pinia store 更新用户选择的方向
    watch(olddirection, (direction) => {
        userStore.setDirection(direction);
    });
    watch(() => userStore.isDrawerOpen, (newVal) => {
        drawer.value = newVal;
    });
  </script>
  