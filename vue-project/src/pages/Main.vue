<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click = 'jumptoLogin()' >Login in</el-dropdown-item>
                <el-dropdown-item>Log out</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <div id="app">
          <div class="container">
            <div class="container_header">
             <el-dropdown class="translated-language">
               <el-button type="primary">
                 Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
               </el-button>
               <template #dropdown>
                 <el-dropdown-menu >
                   <el-dropdown-item>Action 1</el-dropdown-item>
                   <el-dropdown-item>Action 2</el-dropdown-item>
                 </el-dropdown-menu>
               </template>
             </el-dropdown>
              <Selector></Selector>
            </div>
            <div class="container_body">
              <textarea class="input_Text" v-model="inputText" :style="{ fontSize: fontSize + 'px' }" placeholder="输入要翻译的文本"></textarea>
              <el-button class="translate_button" @click="translateText">翻译</el-button>
              <textarea class="translated_Text" v-model="translatedText" :style="{ fontSize: fontSize + 'px' }" placeholder="翻译结果"></textarea>

            </div>
            <div class="container_foot">
              <el-button class="font_size_button" @click="decreaseFontSize"><el-icon><Minus /></el-icon></el-button>
              <el-button class="font_size_button" @click="increaseFontSize"><el-icon><Plus /></el-icon></el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {Menu as IconMenu, Message, Minus, Plus, Setting} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import Selector from '@/components/Selector.vue'
import {value} from '@/components/Selector.vue'

const inputText = ref('');
const translatedText = ref('');
const router = useRouter();

async function translateText() {
  const apiKey = 'sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9';// 替换成你的 API 密钥
  const apiUrl = "https://api.132006.xyz/v1/chat/completions";
  const selectedValue = value.value;

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
            content: '请将下面这段话直接翻译成英文(直接把英文给我):' + selectedValue +inputText.value
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

function  jumptoLogin(){
  router.push('/login');
}

function increaseFontSize() {
  fontSize.value += 2;
}

function decreaseFontSize() {
  fontSize.value -= 2;
}

const fontSize = ref(16); // 初始字体大小
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  height: 100%;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
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
  height: 300px;
  margin-top: 20px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: flex-start; /* 垂直居上 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.container_header {
  height: auto;
  width: 100%;
  margin-bottom: 5px;
}
.container_foot {
  height: auto;
  margin-top: 5px;
}
.container_body{
  margin-top: 0px;
  display: flex;
  height: 80%;
}
.font_size_button{
  margin: 0;
  width: 10px;

}

textarea {
  width: 100%; /* 充满父元素的宽度 */
  height: 100% - 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
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