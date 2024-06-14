<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import {Minus, Plus, Refresh, Edit, Delete, Share, Star, CircleCheck} from '@element-plus/icons-vue'
import Selector from './Selector.vue'
import { ElMessage,  ElMessageBox } from 'element-plus';
import {useUserstore} from '@/store/user'
import {HistoryApi,CollectApi, GetDirectionApi} from "@/request/api";
import Slider from './Slider.vue'
import PreferenceScroll from './PreferenceScroll.vue'
import { FetchtranslationsApi } from "@/request/api";
import emitter from '@/Mitt';
import { onMounted, onUnmounted, computed } from 'vue';

interface ReqChatgptDirection {
    username: string,
    direction: string[],
}
//const tableData = ReqChatgptDirection[]>([]);
const userStore = useUserstore();
const inputText = ref("");
const translatedText = ref("");
const referenceContext = ref("");
const valueToPasswish = ref('');

interface preferwish {
  wish: string;
}
const gridData = ref<preferwish[]>([]);

const fontSize = ref(16); // 初始字体大小
const language = ref("中文翻译到英文");
const loading = ref(false);
const style = ref("");
const handleValueChange = (value: string) => {
  language.value = value;
  console.log(language.value);
};
const nowdirection = ref('btt'); // 默认方向
const inputSentences = ref<string[]>([]);
const translatedSentences = ref<string[]>([]);

const emit = defineEmits(["translate_sum", 'prewish']);
const handleClick = () => {
  userStore.search_sum += 1;
  console.log("handleclick");
  emit("translate_sum");
};
const handlerightClick = () => {
  gridData.value.push({
      wish: 'test',
    });
  console.log('addingrightclick');
  emit("prewish");
};


watch(() => userStore.originalText, (newText) => {
  inputText.value = newText;
});

watch(() => userStore.translatedText, (newText) => {
  translatedText.value = newText;
});


async function fetchTranslations(username: string, wishes: string[], translations: string[], created_at: string[], updated_at: string[],) {
  console.log('fetching')
  const preferData = {
      username: userStore.userName, // 用户名
      wish: wishes,
      translation: translations,
      created_at: created_at,
      updated_at: updated_at
    };
    // 使用 HistoryApi 存储历史记录
    const response = await FetchtranslationsApi(preferData);
    
    console.log(preferData);
    // if (!response.success || !response.wish || !response.translation) {
    //     console.error('Failed to fetch translations:', response.message);
    //     return '';
    // }

    // if (response.wish.length !== response.translation.length) {
    //     console.error('Wishes and translations count do not match');
    //     return '';
    // }
// `我希望${response.wish[index]} 翻译成 ${response.translation[index]}。 `
    let contextString = "";
    response.pretranslation.forEach((item) => {
        if (item.wish && item.translation) { // 确保 wish 和 translation 数据存在
            contextString += ` ${item.wish} 必须翻译成 ${item.translation}。 `;
    } else {
        console.log(`Missing data wish or translation is undefined.`);
    }
  });
  console.log(contextString)
    return contextString;
}
const directionRequest: ReqChatgptDirection = {
    username: userStore.userName,
    direction: []  // 这里将direction设置为一个空数组
};
onBeforeMount(async () => {
  //const response = await FetchtranslationsApi(preferData);
  inputText.value = userStore.originalText;
  translatedText.value = userStore.translatedText;
  userStore.originalText = "";
  userStore.translatedText = "";
  let res = await GetDirectionApi({ username: userStore.userName, direction: directionRequest });
  
})


function splitTextIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[。！？\.\!\?])/)
    .filter((sentence) => sentence.trim().length > 0);
}

// 从 Pinia store 直接获取方向偏好
const drawer = ref(false);
const radio1 = ref('')
const drawerDirection = ref(userStore.direction);
const direction = ref({
  direction: radio1.value,
});


// async function GetDirectionApi(params: string[]) {
//     const response = await fetch('/api/directions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(params)
//     });
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();  // 返回解析后的 JSON 数据，假设这是一个数组
// }



async function translateText() {
  const apiKey = "sk-DuWXLO6nUrpGlIJ8F58f7402B9D04969BcC1E34b2314D0C9"; // 替换成你的 API 密钥
  const apiUrl = "https://api.132006.xyz/v1/chat/completions";
  const data = await fetchTranslations(userStore.userName, userStore.wishes, userStore.translations, userStore.created_at, userStore.updated_at);
  let contextPart = '';
  if(data != '') {
    referenceContext.value = data;
    contextPart = '一定要把这些单词这样翻译:' + referenceContext.value;
  } else {
    referenceContext.value = '';
  }
  console.log("translateText() 函数被调用了！");
  console.log(userStore.translate_style);
  console.log(referenceContext.value);
  if (userStore.translate_style == 0) style.value = "(用口语化的语言)";
  else if (userStore.translate_style == 1) style.value = "(用较口语化的语言)";
  else if (userStore.translate_style == 2) style.value = "";
  else if (userStore.translate_style == 3) style.value = "(用较正式的语言)";
  else style.value = "(用正式的语言)";
  loading.value = true;
  if (inputText.value.length === 0) {
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
            content: contextPart + '现在，请将下面这段话从' + language.value + style.value  + '(直接把译文给我):' + inputText.value 
          }
        ]
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(referenceContext);
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

async function setPreference() {
  if (userStore.userName === '请登录') {
    ElMessage.error("请登录后再设置偏好");
  } else {
    drawer.value = true; // 打开抽屉
  }
}

async function beforeCloseDrawer(done: () => void) {
  ElMessageBox.confirm('您确定要关闭字词翻译设置吗?', '确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    done(); // 关闭抽屉
  }).catch(() => {
    // 用户取消操作
  });
}

async function storeTranslationHistory(
  originalText: string,
  translatedText: string
) {
  try {
    const historyData = {
      username: userStore.userName, // 用户名
      original_text: originalText, // 原始文本
      translated_text: translatedText, // 翻译后的文本
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
      translated_text: translatedText.value, // 翻译后的文本
    };
    if (!inputText.value) {
      ElMessage.error("输入文本不能为空");
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
  inputText.value = "";
}

function copyTranslatedTextToClipboard() {
  // 复制翻译结果到剪贴板
  navigator.clipboard
    .writeText(translatedText.value)
    .then(() => {
      ElMessage.success("翻译结果已复制到剪贴板");
    })
    .catch((error) => {
      console.error("复制翻译结果到剪贴板时发生错误:", error);
      ElMessage.error("复制翻译结果到剪贴板时发生错误");
    });
}

function handleRightClick(event: MouseEvent, data: string) {
  event.preventDefault();  // 例如，阻止默认的右键菜单
  gridData.value.splice(0, gridData.value.length);
  const selectedText = window.getSelection()?.toString().trim();
  if (!selectedText) {
    ElMessage.info("没有选中任何文本");
    return;
  }

  ElMessageBox.confirm(`是否将选中的文本 "${selectedText}" 添加到翻译偏好?`, '添加到翻译偏好', {
    confirmButtonText: '是的',
    cancelButtonText: '取消',
    type: 'info'
  }).then(() => {
    userStore.setNewWish(selectedText);
    gridData.value.push({
      wish: selectedText,
    });
    emitter.emit("prewish", {
      wish: selectedText,
    });
    console.log(gridData.value);
    ElMessage.success("文本已添加到翻译偏好");
  }).catch(() => {
    ElMessage.info("操作已取消");
  });
}
</script>

<template>
  <div class="container_header">
    <Slider></Slider>
    <Selector @handleValueChange="handleValueChange"></Selector>
  </div>
  <div class="container_body">
    <textarea
      class="input_Text"
      v-model="inputText"
      :style="{ fontSize: fontSize + 'px', opacity: 0.8}"
      placeholder="输入要翻译的文本"
      @contextmenu.prevent="handleRightClick"
    >
    </textarea>
    <el-button
      type="primary"
      class="translate_button"
      style=""
      @click="translateText"
      ><el-icon size="20px" :class="{ 'is-loading': loading }"
        ><Refresh /></el-icon
    ></el-button>
    <textarea
      class="translated_Text"
      v-model="translatedText"
      :style="{ fontSize: fontSize + 'px', opacity: 0.8 }"
      placeholder="翻译结果"
    ></textarea>
  </div>
  <div class="container_foot">
    <el-button class="font_size_button" @click="decreaseFontSize"><el-icon><Minus /></el-icon></el-button>
    <el-button class="font_size_button" @click="increaseFontSize"><el-icon><Plus /></el-icon></el-button>
    <el-button type="primary" :icon="Share" @click="copyTranslatedTextToClipboard" title="复制翻译结果"/>
    <el-button type="primary" :icon="Delete"  @click="clearInputText" title="清空文本框"/>
    <el-button type="primary" :icon="Star" @click="collect" title="收藏"/>
    <el-button type="primary" :icon="CircleCheck"  title="设置个人偏好" @click="setPreference">翻译偏好</el-button>
    <el-drawer
    v-model="drawer"
    :before-close="beforeCloseDrawer"
    :direction="nowdirection"
    >
    <!-- 抽屉内容 -->
    <PreferenceScroll></PreferenceScroll>
    </el-drawer>
    
  </div>
</template>

<style scoped>
.container_foot {
  height: auto;
  margin-top: 10px;
}
.container_body {
  margin-top: 0px;
  display: flex;
  height: 80%;
}
.font_size_button {
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
  width: 100%; /* 充满父元素的宽度 */
  height: 100% - 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}
.translate_button:hover {
  transform: scale(1.2); /* Scale up the item */
  transition: transform 0.3s ease; /* Smooth transition */
}

.translate_button {
  transition: transform 0.3s ease; /* Ensure transition is smooth */
}
</style>
