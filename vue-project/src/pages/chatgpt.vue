
<script setup>
import { ref } from 'vue';
import {Plus, Minus} from "@element-plus/icons-vue";

const inputText = ref('');
const translatedText = ref('');

async function translateText() {
  const apiKey = 'sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9';// 替换成你的 API 密钥
  const apiUrl = "https://api.132006.xyz/v1/chat/completions";
  console.log("translateText() 函数被调用了！");
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'user',
            content: '请将下面这段话直接翻译成英文(直接把英文给我):' + inputText.value
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    translatedText.value = data.choices[0].message.content; // 获取助手的回复内容
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function increaseFontSize() {
  fontSize.value += 2;
}

function decreaseFontSize() {
  fontSize.value -= 2;
}

const fontSize = ref(16); // 初始字体大小
</script>

<template>
  <div id="app">
    <div class="container">
      <textarea class="input_Text" v-model="inputText" :style="{ fontSize: fontSize + 'px' }" placeholder="输入要翻译的文本"></textarea>
      <el-button class="translate_button" @click="translateText">翻译</el-button>
      <textarea class="translated_Text" v-model="translatedText" :style="{ fontSize: fontSize + 'px' }" placeholder="翻译结果"></textarea>
      <el-button class="font_size_button" @click="decreaseFontSize"><el-icon><Minus /></el-icon></el-button>
      <el-button class="font_size_button" @click="increaseFontSize"><el-icon><Plus /></el-icon></el-button>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
}

.container {
  width: 90%; /* 调整宽度 */
  max-width: 1200px; /* 调整最大宽度 */
  display: flex;
  align-items: flex-start; /* 垂直居上 */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.font_size_button{
  margin: 0;
  width: 10 px;

}

textarea {
  width: 100%; /* 充满父元素的宽度 */
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  font-size: fontSize + 'px';
}

.translate_button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.translated-text {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>