<template>
  <!-- <el-slider v-model="drawerWidth" min="100" max="500" label="抽屉宽度"></el-slider> -->
  <el-radio-group v-model="direction">
    <el-radio value="ltr">左侧显示</el-radio>
    <el-radio value="rtl">右侧显示</el-radio>
    <el-radio value="ttb">上方显示</el-radio>
    <el-radio value="btt">下方显示</el-radio>
  </el-radio-group>

  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    展示 
  </el-button>
  <el-button type="primary" style="margin-left: 16px" @click="confirmClick">
    保存 
  </el-button>
  
  <el-drawer
    v-model="drawer"
    title="字词翻译"
    :direction="direction"
    :before-close="handleClose"
    :userStore.direction = "direction"
    :size="drawerWidth"
  >
    <span>您好，这个弹出位置可以吗？</span>
  </el-drawer>
  <el-drawer v-model="drawer2" :direction="direction">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import type { DrawerProps } from 'element-plus'
import { ref, watch } from 'vue';
import {useUserstore} from '@/store/user'
import { ElMessage } from 'element-plus';

const userStore = useUserstore();
const olddirection = ref(userStore.direction); // 从 store 获取当前方向

const drawer = ref(false)
const drawer2 = ref(false)
const radio1 = ref('')
const direction = ref('下方显示')
const drawerWidth = ref(300); // 控制抽屉宽度的响应式数据

const handleClose = (done: () => void) => {
  done();  // 直接执行关闭操作
}
function cancelClick() {
  drawer2.value = false
}
async function confirmClick() {
  let show_direction = '';
  if(direction.value == 'ltr') {
    show_direction = '左侧显示';
  }else if(direction.value == 'rtl') {
    show_direction = '右侧显示';
  }else if(direction.value == 'ttb') {
    show_direction = '上方显示';
  }else if(direction.value == 'btt') {
    show_direction = '下方显示';
  }
try {
    const result = await ElMessageBox.confirm(`您确定要选择 ${show_direction} 方向显示抽屉吗 ?`, '确认操作', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const newdirection = {
      username: userStore.userName, // 用户名
      direction: direction.value,
    };

    console.log('用户确认选择:', direction.value);
    userStore.direction = direction.value;
    ElMessage.success("偏好方向保存成功");
  } catch (error: unknown) {  // Note the annotation here for error type
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const message = (error as { message: string }).message;  // Using type assertion
      if (message === 'cancel' || message === 'close') {
        console.log('用户取消了操作');
      } else {
        console.error("存储偏好方向时发生错误:", message);
        ElMessage.error("存储偏好方向时发生错误");
      }
    } else if (typeof error === 'string') {
      console.error("存储偏好方向时发生错误:", error);
      ElMessage.error("存储偏好方向时发生错误");
    } else {
      console.error("存储偏好方向时发生未知错误");
      ElMessage.error("存储偏好方向时发生未知错误");
    }
  }
}
</script>