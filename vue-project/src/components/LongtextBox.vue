<script setup lang="ts">
import { computed, ref, defineComponent, onMounted  } from 'vue';
import { Minus, Plus, CopyDocument, Refresh, Edit, Delete, Share, Star, CircleCheck, Opportunity,Reading } from '@element-plus/icons-vue';
import Selector from './Selector.vue';
import { ElMessage } from 'element-plus';
import { useUserstore } from '@/store/user';
import { HistoryApi, CollectApi } from "@/request/api";
import * as sbd from 'sbd';

import Slider from './Slider.vue';
import emitter from '@/Mitt';

const userStore = useUserstore();
const inputText = ref('');
const translatedText = ref('');
const fontSize = ref(16); // 初始字体大小
const language = ref('中文翻译到英文');
const loading = ref(false);
const style = ref('');
const table = ref(false);
const process = ref(0), parts_count = ref(0), percentage = ref(0);
const searchQuery = ref('');

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

interface Word {
  word: string;
  pos: string;
  translation: string;
}

const gridData = ref<Word[]>([]);

const filteredWords = computed(() => {
  return gridData.value.filter(word =>
    word.word.includes(searchQuery.value)
  );
});

const handleValueChange = (value: string) => {
  language.value = value;
  console.log(language.value);
};

const emit = defineEmits(['translate_sum']);
const handleClick = () => {
  gridData.value.push({
      word: 'test',
      pos: 'test',
      translation: 'test'
    });
  userStore.search_sum += 1;
  console.log("handleclick");
  emit('translate_sum');
};

async function learningTable() {
  const apiKey = 'sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9'; // 替换成你的 API 密钥
  const apiUrl = "https://api.132006.xyz/v1/chat/completions";
  const regex = /(\d+)\.\s+(\w+)\s+\((\w+)\.\)\s+-\s+(.+)/g;
  let textParts;
  gridData.value.splice(0, gridData.value.length);
  if (language.value === '中文翻译到英文') textParts = splitText(translatedText.value, 2000);
  else textParts = splitText(inputText.value, 2000);

  for (const part of textParts) {
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
            content: part + ' Please list the key TOEFL vocabulary in the above text, along with their corresponding translations in Chinese. '
              + 'Following this format uniformly: 1. Courtyard (n.) - 庭院 (One word per line)'
          }
        ]

      })
    });
    const data = await response.json();
    parseVocabulary(data.choices[0].message.content);
  }
  ElMessage.success('学习模块加载完毕');
}

function parseVocabulary(data: string) {
  const regex = /(\d+)\.\s+(\w+)\s+\((\w+)\.\)\s+-\s+(.+)/g;
  let match;
  console.log('parsing', data);
  while ((match = regex.exec(data)) !== null) {
    const index = match[1];
    const word = match[2].toLowerCase();
    const pos = match[3] + '.';
    const translation = match[4];
    console.log(word, pos, translation);
    gridData.value.push({
      word: word,
      pos: pos,
      translation: translation
    });
    console.log(gridData.value);
  }

}

async function translateText() {
  translatedText.value = '';
  const apiKey = 'sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9'; // 替换成你的 API 密钥
  const apiUrl = "https://api.132006.xyz/v1/chat/completions";
  console.log("translateText() 函数被调用了！");
  console.log(userStore.translate_style);
  if (userStore.translate_style == 0) style.value = '(用口语化的语言)';
  else if (userStore.translate_style == 1) style.value = '(用较口语化的语言)';
  else if (userStore.translate_style == 2) style.value = '';
  else if (userStore.translate_style == 3) style.value = '(用较正式的语言)';
  else style.value = '(用正式的语言)';
  loading.value = true;
  if (inputText.value.length === 0) {
    loading.value = false;
    ElMessage.error("输入文本为空");
  } else try {
    const textParts = splitText(inputText.value, 2000);
    const message = [
      {
        role: 'system',
        content: 'You are a translation software'
      },
      {
        role: 'system',
        content: "I will give you several paragraphs of text, and for each paragraph you will translate it (provide me with the translation directly, and make sure to maintain the coherence with the context)." + language.value
      }
    ];
    process.value = 0;
    parts_count.value = textParts.length;
    percentage.value = process.value / parts_count.value * 100;
    for (const part of textParts) {
      message.push({
        role: 'user',
        content: part
      });
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: message
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      process.value++;
      percentage.value = Math.floor(process.value / parts_count.value * 100);
      translatedText.value += data.choices[0].message.content;
      message.push({
        role: 'assistant',
        content: data.choices[0].message.content
      });
    }

    handleClick();
    if (!(userStore.userName === '请登录')) await storeTranslationHistory(inputText.value, translatedText.value);
    else console.log(userStore.userName);

  }
  catch (error) {
    ElMessage.error('翻译失败请重试');
    console.error('There was a problem with the fetch operation:', error);
  }
  finally {
    loading.value = false;
    learningTable();
  }
}

function splitText(text: string, maxLength: number) {
  const textParts = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = startIndex + maxLength;

    if (endIndex >= text.length) {
      endIndex = text.length;
    } else {
      let lastPeriodIndex = Math.max(text.lastIndexOf('.', endIndex), text.lastIndexOf('。', endIndex));
      if (lastPeriodIndex > startIndex) {
        endIndex = lastPeriodIndex + 1; // 包含句号
      }
      console.log(endIndex, "   ", text.lastIndexOf('.', endIndex), "  ", text.lastIndexOf('。', endIndex));
    }
    textParts.push(text.substring(startIndex, endIndex).trim());
    startIndex = endIndex;
  }

  return textParts;
}

async function storeTranslationHistory(originalText: string, translatedText: string) {
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
    if (!inputText.value) {
      ElMessage.error('输入文本不能为空');
      return;
    }
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
  inputText.value = '';
}

function copyTranslatedTextToClipboard() {
  navigator.clipboard.writeText(translatedText.value).then(() => {
    ElMessage.success("翻译结果已复制到剪贴板");
  }).catch((error) => {
    console.error("复制翻译结果到剪贴板时发生错误:", error);
    ElMessage.error("复制翻译结果到剪贴板时发生错误");
  });
}


const addtoWordlist = (row: Word) => {
 // Emitting an event with the name 'sayHello'
 console.log('adding')
 emitter.emit("addingword", {
    word: row.word,
    pos: row.pos,
    translation: row.translation
  });
  table.value = false;

};

function splitTextIntoSentences(text: string): string[] {
  return text.match(/[^.!?。\！？…]+[.!?。\！？…]+/g) || [];
/*
   const options = {
    newline_boundaries: true, // 换行符是否被视为断句标志
    html_boundaries: true, // HTML标签是否被视为断句标志
    sanitize: false, // 是否清理文本中的HTML标签
    allowed_tags: false // 允许的HTML标签（如果sanitize为true）
  };

  return sbd.sentences(text, options);*/
}

const highlightedIndex = ref<number | null>(null);
const dialogVisible = ref(false);

function highlightTranslation(index: number) {
  highlightedIndex.value = index;
}

function removeHighlight() {
  highlightedIndex.value = null;
}
const originalSentences = ref<string[]>([]);
const translatedSentences = ref<string[]>([]);

function compareText() {
  dialogVisible.value = true;
  console.log(inputText.value);
  const Sentences1 = splitTextIntoSentences(inputText.value);
  const Sentences2 = splitTextIntoSentences(translatedText.value);
  originalSentences.value = Sentences1;
  translatedSentences.value = Sentences2;
  console.log(originalSentences);
}
</script>

<template>
  <div class="container_header">
    <Slider></Slider>
    <Selector @handleValueChange="handleValueChange"></Selector>
  </div>
  <div class="container_body">
    <textarea class="input_Text" v-model="inputText" :style="{ fontSize: fontSize + 'px',opacity: 0.8 }" placeholder="输入要翻译的文本"></textarea>
    <el-button type="primary" class="translate_button" @click="translateText"><el-icon size="20px" :class="{ 'is-loading': loading }"><Refresh /></el-icon></el-button>
    <textarea class="translated_Text" v-model="translatedText" :style="{ fontSize: fontSize + 'px',opacity: 0.8 }" placeholder="翻译结果"></textarea>
  </div>
  <div style="margin-top: 10px; display: flex;">
    <el-tag size="large" >当前字数： {{ inputText.length }}</el-tag>
    <div class="demo-progress" style="margin-left: 10px; margin-top: 3px; margin-right: 10px;">
      <el-progress :text-inside="true" :percentage="percentage" :color="customColors" :stroke-width="15" striped/>
    </div>
    <el-tag>当前翻译进度</el-tag>
  </div>
  <div class="container_foot">
    <el-button class="font_size_button" @click="decreaseFontSize"><el-icon><Minus /></el-icon></el-button>
    <el-button class="font_size_button" @click="increaseFontSize"><el-icon><Plus /></el-icon></el-button>
    <el-button type="primary" :icon="CopyDocument" @click="copyTranslatedTextToClipboard" title="复制翻译结果"/>
    <el-button type="primary" :icon="Delete"  @click="clearInputText" title="清空文本框"/>
    <el-button type="primary" :icon="Star" @click="collect" title="收藏"/>
    <el-button type="primary" :icon="CircleCheck"  title="设置个人偏好">个人偏好</el-button>
    <el-button type="primary" :icon="Opportunity"  title="打开学习面板" @click="table = true">学习者</el-button>
    <el-button type="primary" :icon="Reading"  title="文本比对" @click="compareText" >文本比对</el-button>
  </div>
  <el-dialog
      title="原文与译文"
      v-model="dialogVisible"
      width="60%"
      center
      draggable="true"
    >
      <div class="text-container">
        <div class="original-text">
          <template v-for="(sentence, index) in originalSentences" :key="index">
            <span
              class="highlightable-span"
              @mouseover="highlightTranslation(index)"
              @mouseleave="removeHighlight"
              :class="{ highlighted: index === highlightedIndex }"
            >
              {{ sentence }}
            </span>
          </template>
        </div>
        <div class="translated-text">
          <template v-for="(sentence, index) in translatedSentences" :key="index">
            <span
              class="highlightable-span"
              :class="{ highlighted: index === highlightedIndex }"
            >
              {{ sentence }}
            </span>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  <el-drawer
    v-model="table"
    title="学习面板"
    direction="rtl"
    size="50%"
  >
    <el-table :data="filteredWords">
      <el-table-column property="word" label="重点词汇" width="200" />
      <el-table-column property="pos" label="词性" width="80" />
      <el-table-column property="translation" label="释义" width="200" />
      <el-table-column align="right">
        <template #header>
          <el-input
            size="small"
            v-model="searchQuery"
            placeholder="搜索单词"
            clearable
            style="width: 150px;"
          />
        </template>
        <template #default="scope">
          <el-button size="small" label="加入单词本" @click="addtoWordlist(scope.row)">
            <el-icon><Plus /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
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
  background-color: #2a598a;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  height: 50px;
  width: 60px;
}
textarea {
  width: 100%; 
  height: 100% - 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}
.demo-progress .el-progress--line {
  margin-bottom: 5px;
  margin-left: 60px;
  width: 400px;
}

.translate_button:hover {
  transform: scale(1.2); /* Scale up the item */
  transition: transform 0.3s ease; /* Smooth transition */
}

.translate_button {
  transition: transform 0.3s ease; /* Ensure transition is smooth */
}

.text-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.original-text, .translated-text {
  width: 45%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.highlightable-span{
  display: inline-block;
  margin: 5px 0;
  cursor: pointer;
}

.highlighted {
  background-color: yellow;
}
</style>
