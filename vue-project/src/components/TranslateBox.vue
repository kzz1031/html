<script setup lang="ts">
import { ref } from 'vue'
import {Minus, Plus, Refresh, Edit, Delete, Share, Star} from '@element-plus/icons-vue'
import Selector from './Selector.vue'
import { ElMessage } from 'element-plus';
import {useUserstore} from '@/store/user'
import {HistoryApi,CollectApi} from "@/request/api";
import Slider from './Slider.vue'

const userStore=useUserstore()
const inputText = ref('');
const translatedText = ref('');
const fontSize = ref(16); // 初始字体大小
const language = ref('');
const loading = ref(false)
const style = ref('')
const handleValueChange = (value : string) => {
  language.value = value;
  console.log(language.value);
}

const emit = defineEmits(['translate_sum'])
const handleClick = () => {
  userStore.search_sum += 1 ;
  console.log("handleclick");
  emit('translate_sum');
}

async function translateText() {
  handleClick();
  const apiKey = 'sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9';// 替换成你的 API 密钥
  const apiUrl = "https://api.132006.xyz/v1/chat/completions";
  console.log("translateText() 函数被调用了！");
  console.log(userStore.translate_style);
  if(userStore.translate_style == 0) style.value = '(用口语化的语言)'
    else if(userStore.translate_style == 1) style.value = '(用较口语化的语言)'
      else if(userStore.translate_style == 2) style.value =''
        else if(userStore.translate_style == 3) style.value = '(用较正式的语言)'
          else style.value = '(用正式的语言)' 
  loading.value =true;
  if(inputText.value.length === 0)
  {
    loading.value = false;
    ElMessage.error("输入文本为空");
  }
  else try {
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
            content: '请将下面这段话从' + language.value + style.value + '(直接把译文给我):' + inputText.value
          }
        ]
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    translatedText.value = data.choices[0].message.content; // 获取助手的回复内容

    if(!(userStore.userName === '请登录'))  await storeTranslationHistory(inputText.value, translatedText.value);
      else console.log(userStore.userName);

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  } finally{
    loading.value = false;
  }
}

async function storeTranslationHistory(originalText:string, translatedText:string) {
    try {
        const historyData = {
            username: userStore.userName, // 用户名
            original_text: originalText, // 原始文本
            translated_text: translatedText // 翻译后的文本
        };

        // 使用 HistoryApi 存储历史记录
        const response = await HistoryApi(historyData);

        if (response.success) {
            ElMessage.success("历史记录保存成功");
        } else {
            ElMessage.error("历史记录保存失败");
        }
    } catch (error) {
        console.error("存储历史记录时发生错误:", error);
        ElMessage.error("存储历史记录时发生错误");
    }
}

async function collect() {
    try {
        const Data = {
            username: userStore.userName, // 用户名
            original_text: inputText.value, // 原始文本
            translated_text: translatedText.value // 翻译后的文本
        };
        if(!inputText.value){
          ElMessage.error('输入文本不能为空')
          return;
        }
        // 使用 HistoryApi 存储历史记录
        const response = await CollectApi(Data);

        if (response.success) {
            ElMessage.success("收藏成功");
        } else {
            ElMessage.error(response.message);
        }
    } catch (error) {
        console.error("收藏时发生错误:", error);
        ElMessage.error("收藏时发生错误");
    }
}


function increaseFontSize() {
  fontSize.value += 2;
}

function decreaseFontSize() {
  fontSize.value -= 2;
}
function clearInputText() {
  // 清除输入文本框中的文本
  inputText.value = '';
}

function copyTranslatedTextToClipboard() {
  // 复制翻译结果到剪贴板
  navigator.clipboard.writeText(translatedText.value).then(() => {
    ElMessage.success("翻译结果已复制到剪贴板");
  }).catch((error) => {
    console.error("复制翻译结果到剪贴板时发生错误:", error);
    ElMessage.error("复制翻译结果到剪贴板时发生错误");
  });
}
</script>

<template>
  <div class="container_header">
    <Slider></Slider>
    <Selector @handleValueChange="handleValueChange"></Selector>
  </div>
  <div class="container_body">
    <textarea class="input_Text" v-model="inputText" :style="{ fontSize: fontSize + 'px' }" placeholder="输入要翻译的文本"></textarea>
    <el-button class="translate_button" @click="translateText"><el-icon size="20px" :class="{ 'is-loading': loading }"><Refresh /></el-icon></el-button>
    <textarea class="translated_Text" v-model="translatedText" :style="{ fontSize: fontSize + 'px' }" placeholder="翻译结果"></textarea>
  </div>
  <div class="container_foot">
    <el-button class="font_size_button" @click="decreaseFontSize"><el-icon><Minus /></el-icon></el-button>
    <el-button class="font_size_button" @click="increaseFontSize"><el-icon><Plus /></el-icon></el-button>
    <el-button type="primary" :icon="Share" @click="copyTranslatedTextToClipboard"/>
    <el-button type="primary" :icon="Delete"  @click="clearInputText"/>
    <el-button type="primary" :icon="Star" @click="collect"/>
  </div>
</template>

<style scoped>
.container_foot {
  height: auto;
  margin-top: 10px;
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
.translate_button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 5px;
}
textarea {
  width: 100%; /* 充满父元素的宽度 */
  height: 100% - 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

</style>