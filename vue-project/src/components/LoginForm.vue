<template>
  <div class="container">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" @submit.prevent="submitForm(ruleFormRef)" class="form">
      <h2>登录</h2>
      <el-form-item prop="userName">
        <label for="username">用户名</label>
        <el-input id="username" placeholder="输入用户名" v-model="ruleForm.userName"></el-input>
        <small v-if="usernameError">{{ usernameError }}</small>
      </el-form-item>
      <el-form-item prop="password">
        <label for="password">密码</label>
        <el-input type="password" id="password" placeholder="输入密码" v-model="ruleForm.password"></el-input>
        <small v-if="passwordError">{{ passwordError }}</small>
      </el-form-item>
      <el-button type="primary" native-type="submit" class="login-btn">登录</el-button>
      <el-button type="success" @click="jumpToRegister" class="register-btn">注册</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {useRouter} from 'vue-router'
import {useUserstore} from '@/store/user'
import {LoginApi} from "@/request/api";
import {ElMessage} from 'element-plus'
import { GetUserInfoByUserName } from '@/request/api';

const userStore=useUserstore()
const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  userName: '',
  password: ''
})


const checkUserName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}

const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  userName: [{validator: checkUserName, trigger: 'blur'}],
  password: [{validator: checkPassword, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let res = await LoginApi({
        username: ruleForm.userName,
        password: ruleForm.password
      })
      if (res.success) {
        ElMessage.success('登陆成功')
        userStore.userName=ruleForm.userName
        
        let res2 = await GetUserInfoByUserName({
          userName: userStore.userName
        })
        //userStore.search_sum =  
        userStore.is_superuser = res2.user.is_superuser;
        console.log(userStore.is_superuser)
        //await router.push({ name: 'IndexMain', params: { userName: ruleForm.userName } });
        router.push('/');
      } else {
        ElMessage.error('登陆失败，请重新输入用户名和密码')
      }
    } else {
      ElMessage.error('登陆失败，未输入用户名和密码')
      return false
    }
  })
}

function jumpToRegister() {
  router.push('/register')
}

</script>

<style scoped>
/* CSS 样式不变 */
:root {
  --success-color: #2ecc71;
  --error-color: #e74c3c;
}

.container {
  background-color: rgba(255, 255, 255, 0.7);;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 300px;   /* 根据需要调整宽度 */
  padding: 40px;  /* 增加内边距以提供更多的空间 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h2 {
  text-align: center; /* 使文本居中 */
  width: 100%;        /* 确保宽度足够包含标题 */
  margin-top: 5px;   /* 根据需要调整上边距 */
  margin-bottom: 20px;/* 根据需要调整下边距 */
}
.form {
  width: 100%;
}
.form-control {
  margin-bottom: 20px;
}
.form-control label {
  display: block;
  margin-bottom: 5px;
}
.login-btn, .register-btn {
  width: 100%;
  padding: 11px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px; /* 可以调整字体大小以匹配设计 */
  margin-bottom: 10px; /* 给登录按钮添加额外的下边距 */
}
.login-btn {
  background-color: #3498db;
  margin-bottom: 20px;
  margin-top: 10px;
}
.register-btn {
  background-color: #2ecc71;
  margin-bottom: 0; /* 保持注册按钮与容器底部的距离 */
}
.error el-input {
  border-color: #e74c3c;  /* 当验证错误时，输入框边框显示为红色*/
}
.error el-small {
  color: #e74c3c;         /* 错误消息文本为红色 */
  display: block;     /* 确保错误消息显示 */
}
::v-deep .el-form-item label {
  font-size: 18px; /* 使用深度选择器调整字体大小 */
  color: gray; /* 设置标签的文字颜色为灰色 */
}
.el-button {
  font-size: 16px; /* 增加字体大小 */
  border-radius: 6px; /* 可选，增加圆角使按钮看起来更圆润 */
  width: 100%; /* 使按钮宽度充满其父容器 */
  padding: 20px 30px; /* 调整 padding 以增大按钮 */
}
.el-button--primary {
  margin-right: 10px; /* 在主要按钮右侧添加间距 */
}

.el-button--success {
  margin-left: -0.5px; /* 在成功按钮左侧添加间距 */
}
::v-deep .el-input__wrapper {
  width: 60%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border 0.3s ease-in-out;  /* 添加过渡效果 */
}

::v-deep .el-input__wrapper:focus-within {
  outline: 0; /* 移除默认的聚焦轮廓线 */
  border-color: #777; /* 聚焦时边框颜色变为深灰色 */
  border-width: 2px; /* 边框加粗 */
  /*transform: scale(1.05); /* 聚焦时放大 */
  /*width: 100%; /* 聚焦时宽度变为100%,这个是直接增大，不缓慢变化 */
}
::v-deep .el-form-item.is-success .el-input__wrapper {
  border: 2px solid #67C23A; /* 绿色边框表示验证成功 */
}

::v-deep .el-form-item.is-error .el-input__wrapper {
  border: 2px solid #F56C6C; /* 红色边框表示验证失败 */
}
</style>