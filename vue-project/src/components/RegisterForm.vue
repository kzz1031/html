//RegisterForm.vue
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { RegisterApi } from '@/request/api';

const router = useRouter();

const ruleFormRef = ref<FormInstance>();

const registerForm = reactive({
  userName: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
});

const rules: FormRules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的电子邮件地址', trigger: ['blur', 'change'] },
  ],
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let res = await RegisterApi({
        username: registerForm.userName,
        password: registerForm.password,
        first_name: registerForm.first_name,
        last_name: registerForm.last_name,
        email: registerForm.email,
      });
      if (res.success) {
        ElMessage.success('注册成功');
        await router.push('/Login');
      } else {
        ElMessage.error('注册失败，请重新输入');
      }
    } else {
      ElMessage.error('注册失败，请重新输入');
      return false;
    }
  });
};

function jumpToLogin() {
  router.push('/');
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="registerForm"
    :rules="rules"
    style="max-width: 600px"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="registerForm.userName" type="text" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="registerForm.password" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item label="名" prop="first_name">
      <el-input v-model="registerForm.first_name" type="text" autocomplete="off" />
    </el-form-item>

    <el-form-item label="姓" prop="last_name">
      <el-input v-model="registerForm.last_name" type="text" autocomplete="off" />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerForm.email" type="text" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="submitForm(ruleFormRef)">注册</el-button>
      <el-button type="primary" @click="jumpToLogin()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>


</style>