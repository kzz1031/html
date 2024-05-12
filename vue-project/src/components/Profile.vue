//Profile.vue
<script setup lang="ts">
import {GetUserInfoByUserName} from "@/request/api";
import {ElMessage} from "element-plus";
import {onBeforeMount, ref} from "vue";
import {useUserstore} from '@/store/user'

const userStore=useUserstore()

let user = ref({
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  avatar: 'https://img2.imgtp.com/2024/04/05/QUYeUsws.jpg', // 假设的头像URL
})

async function getUserInfo() {
  let res = await GetUserInfoByUserName({
    userName: userStore.userName
  })
  // console.log(res)
  if (res.success) {
    user.value.username = res.user.username
    if (res.user.email === "")
      user.value.email = res.user.first_name + res.user.last_name + "@example.com"
    else
    user.value.email = res.user.email
    user.value.first_name = res.user.first_name
    user.value.last_name = res.user.last_name
  } else {
    ElMessage.error('个人信息查询失败')
  }
}

onBeforeMount(() => {
  getUserInfo()
});


</script>

<template>
  <div class="user-profile">
    <img :src="user.avatar" alt="User Avatar" class="avatar"/>
    <h2>{{ user.username }}</h2>
    <p><strong>Full Name:</strong> {{ user.first_name }} {{ user.last_name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
  </div>
</template>

<style scoped>
.user-profile {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
}

.user-profile .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
}
</style>