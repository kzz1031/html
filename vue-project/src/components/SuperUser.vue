<template>
  
    <el-button plain @click="dialogFormVisible = true" style="margin-top: 10px;">
      申请成为超级管理员
    </el-button>
  

    <el-dialog v-model="dialogFormVisible" title="成为超级管理员" width="500">
      <el-form :model="form">
        <el-form-item label="密钥" :label-width="formLabelWidth" >
          <el-input v-model="form.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="dialogFormVisible = false; submit(form.password);">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useUserstore } from '@/store/user';
  import { ElMessage } from 'element-plus';
  import { SuperUserApi } from '@/request/api';
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  const Userpassword = ref('kkk')
  const userStore=useUserstore()
  
  const form = reactive({
    password: '',
  })
  
  async function submit(params:string) {
    console.log("submiting!");
    console.log(params);
    if(params != Userpassword.value) {
        ElMessage.warning("无效密钥")
    }
    else {
        try {
        const SuperUser = {
            username : userStore.userName,
        };  
        const response = await SuperUserApi(SuperUser);

        if ( response.success ) {
            ElMessage.success("已成为超级管理员");
        } else {
            ElMessage.error("无效密钥");
        }
    } catch (error) {
        ElMessage.error("成为超级管理员时发生错误");
    }
    }
  }

  </script>