<template>
  <div class="container">
    <form id="form" class="form" @submit.prevent="onSubmit">
      <h2>注册</h2>
      <div class="form-control" :class="{ 'error': usernameError, 'success': usernameSuccess }">
        <label for="username">用户名</label>
        <input type="text" id="username" placeholder="输入用户名" v-model="username" @blur="validateUsername">
        <small v-if="usernameError">{{ usernameError }}</small>
      </div>
      <div class="form-control" :class="{ 'error': emailError, 'success': emailSuccess }">
        <label for="email">邮箱</label>
        <input type="text" id="email" placeholder="输入邮箱" v-model="email" @blur="validateEmail">
        <small v-if="emailError">{{ emailError }}</small>
      </div>
      <div class="form-control" :class="{ 'error': passwordError, 'success': passwordSuccess }">
        <label for="password">密码</label>
        <input type="password" id="password" placeholder="输入密码" v-model="password" @blur="validatePassword">
        <small v-if="passwordError">{{ passwordError }}</small>
      </div>
      <div class="form-control" :class="{ 'error': password2Error, 'success': password2Success }">
        <label for="password2">确认密码</label>
        <input type="password" id="password2" placeholder="再次输入密码" v-model="password2" @blur="validatePassword2">
        <small v-if="password2Error">{{ password2Error }}</small>
      </div>
      <button type="submit" class= "register-btn">提交注册</button>
      <button type="button" class="back-login-btn" @click="goToLogin">返回登录</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {ElMessage} from 'element-plus'
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      password2Error: '',
      usernameSuccess: false,
      emailSuccess: false,
      passwordSuccess: false,
      password2Success: false,
    };
  },
  methods: {
    validateEmail() {
      this.checkEmail(this.email);
    },
    checkEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email.trim())) {
        this.emailError = '邮箱格式不合法';
        this.emailSuccess = false;
      } else {
        this.emailError = '';
        this.emailSuccess = true;
      }
    },
    validateUsername() {
      if (this.username.trim() === '') {
        this.usernameError = '用户名不能为空';
        this.usernameSuccess = false;
      } else {
        this.usernameError = this.checkLength(this.username, 3, 40);
        this.usernameSuccess = !this.usernameError;
      }
    },
    validatePassword() {
      if (this.password.trim() === '') {
        this.passwordError = '密码不能为空';
        this.passwordSuccess = false;
      } else {
        this.passwordError = this.checkLength(this.password, 6, 25);
        this.passwordSuccess = !this.passwordError;
      }
    },
    validatePassword2() {
      if (this.password2.trim() === '') {
        this.password2Error = '确认密码不能为空';
        this.password2Success = false;
      } else {
        this.checkPasswordsMatch();
        this.password2Success = !this.password2Error;
      }
    },
    checkRequired() {
      this.usernameSuccess = this.username.trim() !== '';
      this.emailSuccess = this.email.trim() !== '';
      this.passwordSuccess = this.password.trim() !== '';
      this.password2Success = this.password2.trim() !== '';
      //错误信息
      this.usernameError = this.username.trim() === '' ? '请输入用户名' : '';
      this.emailError = this.email.trim() === '' ? '请输入邮箱' : '';
      this.passwordError = this.password.trim() === '' ? '请输入密码' : '';
      this.password2Error = this.password2.trim() === '' ? '请再次确认密码' : '';
    },
    checkLength(input, min, max) {
      if (input.length < min) {
        return `至少需 ${min} 位`;
      } else if (input.length > max) {
        return `最多需 ${max} 位`;
      }
      return '';
    },
    checkPasswordsMatch() {
      if (this.password !== this.password2) {
        const errorMsg = '密码不匹配';
        this.password2Error = errorMsg;
        this.passwordError = errorMsg; 
      } else {
        this.password2Error = '';
        this.passwordError = '';   
      }
    },
    async onSubmit() {
      event.preventDefault();  // 阻止表单默认提交行为
      this.checkRequired();
      this.checkPasswordsMatch();  // 首先检查密码是否匹配
      this.checkEmail(this.email);  // 确保提交时再次验证邮箱
      if (!this.password2Error) {  // 如果密码匹配，则检查长度
        this.passwordError = this.checkLength(this.password, 6, 25);
        if (this.passwordError) {
          this.password2Error = this.passwordError;  // 应用相同的错误到password2，因为长度错误也影响确认密码
        }
      }
      // if (!this.usernameError && !this.emailError && !this.passwordError && !this.password2Error) {
      //   // //this.checkEmail();
        if (!this.usernameError && !this.emailError && !this.passwordError && !this.password2Error) {
        // 所有验证通过后，发送数据到服务器
          try {
            const response = await axios.post('/api/register', {
              username: this.username,
              email: this.email,
              password: this.password
            });
            ElMessage.success('注册成功')
            console.log('注册成功', response.data);
            this.$router.push('/login');
          } catch (error) {
            ElMessage.error('注册失败，请检查输入'); // 添加错误提示
            console.error('注册失败', error.response.data);
          }
        }
      //}
    },
    goToLogin() {
      this.$router.push('/login'); // 使用 Vue Router 导航回登录页面
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

/* CSS from your original file */
:root {
  --success-color: #2ecc71;
  --error-color: #e74c3c;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #f9fafb;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}

h2 {
  text-align: center;
  margin: 0 0 20px;
}

.form {
  padding: 30px 40px;
}

.form-control {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.form-control label {
  color: #777;
  display: block;
  margin-bottom: 5px;
}

.form-control input {
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  transition: border 0.3s ease-in-out;  /* 添加过渡效果 */
}

.form-control input:focus {
  outline: 0;
  border-color: #777;
  border-width: 2px; /* 加粗边框 */
}

.form-control.success input {
  /* border-color: var(--success-color); */
  border-color: #2ecc71
}

.form-control.error input {
  /* border-color: var(--error-color); */
  border-color: #e74c3c;
}

.form-control small {
  /* color: var(--error-color); */
  color: #e74c3c; 
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
}

.back-login-btn, .register-btn {
  cursor: pointer;
  background-color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
}

.register-btn {
  background-color: #3498db;
  margin-bottom: 0; /* 保持注册按钮与容器底部的距离 */
}

.back-login-btn {
  background-color: #2ecc71; /* 绿色背景 */
  color: white; /* 白色文字 */
  border: 2px solid #2ecc71; /* 绿色边框 */
  margin-bottom: 10px;
}
</style>