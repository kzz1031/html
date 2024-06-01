<template>
  <div>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="单词本"
      placement="top-start"
    >
      <button class="fixed-button" @click="showDialog = true">
        <el-icon size="30"><Notebook /></el-icon>
      </button>
    </el-tooltip>
    <el-dialog v-model="showDialog" title="单词本" width="30%" draggable>
      <el-form>
        <el-form-item label="单词">
          <el-input v-model="word"></el-input>
        </el-form-item>
        <el-form-item label="意思">
          <el-input v-model="meaning"></el-input>
        </el-form-item>
        <el-form-item label="词性">
          <el-select v-model="partOfSpeech" placeholder="请选择词性">
            <el-option label="n." value="n."></el-option>
            <el-option label="v." value="v."></el-option>
            <el-option label="adj." value="adj."></el-option>
            <el-option label="adv." value="adv."></el-option>
          </el-select>
        </el-form-item>
        <div class="form-footer">
          <el-form-item>
            <el-tag style="margin-right: 5px">评级</el-tag>
            <el-rate v-model="rate" size="large" />
          </el-form-item>
        </div>
      </el-form>
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="saveWord">保存</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Notebook } from "@element-plus/icons-vue";
import { InsertWordApi } from "@/request/api";
import { useUserstore } from "@/store/user";
import { ElMessage } from "element-plus";
import useStore from "element-plus/es/components/table/src/store/index.mjs";
import emitter from "@/Mitt";

const showDialog = ref(false);
const word = ref("");
const meaning = ref("");
const partOfSpeech = ref("");
const rate = ref(0);

onMounted(() => {
  console.log('word component mounted and listener set');
  emitter.on('addingword', (message) => {
    showDialog.value = true;
    word.value = message.word;
    partOfSpeech.value = message.pos;
    meaning.value = message.translation;
    console.log(message.word, message.pos, message.translation);
  });
});

function saveWord() {
  // 在这里处理保存单词的逻辑，例如发送到服务器或保存到本地
  console.log("单词:", word.value);
  console.log("意思:", meaning.value);
  console.log("词性:", partOfSpeech.value);
  console.log("评分:", rate.value);
  if (useUserstore().userName == "请登录") {
    ElMessage.error("未登录，无法添加单词");
    return;
  }
  StoreWord();
  showDialog.value = false; // 关闭对话框
}
async function StoreWord() {
  const wordinfo = {
    username: useUserstore().userName,
    word: word.value,
    prop: partOfSpeech.value,
    meaning: meaning.value,
    rate: rate.value,
  };
  const response = await InsertWordApi(wordinfo);
  if (response.success) {
    ElMessage.success("单词已添加至单词本");
  } else {
    ElMessage.error("单词添加失败");
  }
}
</script>

<style scoped>
.fixed-button {
  position: fixed;
  bottom: 20px;
  height: 80px;
  left: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
