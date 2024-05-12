<template>
    <el-descriptions title="个人信息" :column="3" border style="margin-top: 10px;">
      <el-descriptions-item
        label="用户名"
        label-align="right"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="150px"
      >
      {{ user.username }}
      </el-descriptions-item>
      <el-descriptions-item label="名" label-align="right" align="center">
        {{ user.first_name }}
      </el-descriptions-item>
      <el-descriptions-item label="姓" label-align="right" align="center">
        {{ user.last_name }}
      </el-descriptions-item>
      <el-descriptions-item label="超级管理员" label-align="right" align="center">
        <el-tag size="small">{{user.is_superuser}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="邮箱" label-align="right" align="center">
        {{ user.email }}
      </el-descriptions-item>
    </el-descriptions>

    <el-button type="primary" style="margin-top: 10px;" @click="showDialog = true">
      修改用户信息
    </el-button>

    <el-dialog v-model="showDialog" title="修改用户信息" width="40%">
      <el-form
        :model="editUser"
        label-width="100px"
        style="max-width: 600px; padding: 10px;">
        <el-form-item label="用户名">
          <el-tag>{{ editUser.username }}</el-tag>
        </el-form-item>
        <el-form-item label="名">
          <el-input v-model="editUser.first_name" />
        </el-form-item>
        <el-form-item label="姓">
          <el-input v-model="editUser.last_name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editUser.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit(), showDialog = false">保存</el-button>
          <el-button @click="showDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </template>
  <style scoped>
  :deep(.my-label) {
    background: var(--el-color-success-light-9) !important;
  }
  :deep(.my-content) {
    background: var(--el-color-danger-light-9);
  }
  </style>

<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import { ElMessage } from "element-plus";
import {GetUserInfoByUserName} from "@/request/api";
import {useUserstore} from '@/store/user'
import { UpdateUserInfo } from "@/request/api";
const userStore = useUserstore();

const showDialog = ref(false);

let user = ref({
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  is_superuser: true
})

let editUser = ref({
  username: '',
  first_name: '',
  last_name: '',
  email: ''
});

async function getUserInfo() {
  let res = await GetUserInfoByUserName({
    userName: userStore.userName
  })
  console.log(res)
  if (res.success) {
    user.value.username = res.user.username
    user.value.email = res.user.email
    user.value.first_name = res.user.first_name
    user.value.last_name = res.user.last_name
    user.value.is_superuser = res.user.is_superuser;
    editUser.value = { ...res.user };
  } else {
    ElMessage.error('个人信息查询失败')
  }
}

async function handleSubmit() {
  console.log("updating");
  try {
    let res = await UpdateUserInfo(editUser.value);
    if (res.success) {
      ElMessage.success('用户信息更新成功');
      user.value.username = editUser.value.username
      user.value.email = editUser.value.email
      user.value.first_name = editUser.value.first_name
      user.value.last_name = editUser.value.last_name
    } else {
      ElMessage.error('用户信息更新失败');
    }
  } catch (error) {
    ElMessage.error('发生错误，请稍后再试');
  }
}

onBeforeMount(() => {
  getUserInfo()
});

</script>
  