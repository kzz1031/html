<template>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <el-image :src="image" :fit="fit" />
      </el-carousel-item>
    </el-carousel>
    <div class="welcome-message">
      <el-text>欢迎第{{ userNumber }}位用户</el-text>
    </div>
</template>

<script setup lang="ts">
import { ref,onBeforeMount } from 'vue';
import image1 from '@/assets/images/background.jpeg';  // 正确导入图片
import image2 from '@/assets/images/Intro.png';
import image3 from '@/assets/images/Main.png';
import { GetActiveUser } from '@/request/api';
const images = ref([image1, image2, image3]);
const userNumber = ref(0)
const fit = ref('cover');  // 设置图片的fit属性

onBeforeMount(async () => {
  const res = await GetActiveUser();
  userNumber.value = res.total_users;
})

</script>

  <style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #ffffff;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #ffffff;
  }
  .welcome-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;  
  margin-top: 50px;
  font-family: 'Arial', sans-serif;  
}

.welcome-message .el-text {
  font-size: 40px;  
  font-weight: bold;  
  color: #475669;
}
  </style>
  