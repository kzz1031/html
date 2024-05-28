<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import { GetWordApi } from "@/request/api";
import { useUserstore } from "@/store/user";
import { ElMessage } from "element-plus";
import { Search, Delete, View } from "@element-plus/icons-vue";
import router from "@/router";

interface Word {
  word: string;
  meaning: string;
  prop: string;
  created_at: string;
  rate: number;
}
const currentWord = ref<Word>({
  word: "",
  meaning: "",
  prop: "",
  created_at: "",
  rate: 0,
});
const tableData = ref<Word[]>([]);
const userStore = useUserstore();
const searchQuery = ref("");
const wordDialogVisible = ref(false);

onBeforeMount(async () => {
  if (userStore.userName == "请登录") {
    ElMessage("用户未登录");
    router.push("/");
  }
  let res = await GetWordApi({ username: userStore.userName });
  res.words.forEach((item) => {
    tableData.value.push({
      word: item.word,
      meaning: item.meaning,
      created_at: item.created_at.substring(0, 10),
      prop: item.prop,
      rate: item.rate,
    });
  });
});

const showWordDialog = (word: Word) => {
  // 显示单词信息对话框，并将当前单词信息赋值给currentWord
  wordDialogVisible.value = true;
  currentWord.value = { ...word };
};

const updateWord = () => {
  // 发送更新单词信息的请求，这里需要根据实际情况调用API
  // 更新成功后关闭对话框
  wordDialogVisible.value = false;
};

const filteredWords = computed(() => {
  return tableData.value.filter((word) =>
    word.word.includes(searchQuery.value)
  );
});

const sortByTime = () => {
  tableData.value.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

const sortByRate = () => {
  tableData.value.sort((a, b) => b.rate - a.rate);
};

const handleDelete = (index: number) => {
  tableData.value.splice(index, 1);
};
</script>

<template>
  <div class="center-container">
    <el-input
      v-model="searchQuery"
      placeholder="搜索单词"
      class="search-input"
      clearable
      :prefix-icon="Search"
    />
    <el-button type="primary" @click="sortByTime">按时间排序</el-button>
    <el-button type="primary" @click="sortByRate">按评分排序</el-button>
  </div>
  <el-table :data="filteredWords" style="width: 100%" stripe>
    <el-table-column prop="word" label="单词" width="150"></el-table-column>
    <el-table-column prop="meaning" label="意思" width="200"></el-table-column>
    <el-table-column prop="prop" label="词性" width="100"></el-table-column>
    <el-table-column
      prop="created_at"
      label="创建时间"
      width="180"
    ></el-table-column>
    <el-table-column prop="rate" label="评分" width="200">
      <template #default="scope">
        <el-rate v-model="scope.row.rate" disabled></el-rate>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="60">
      <template #default="scope">
        <el-button
          @click="handleDelete(scope.$index)"
          link
          type="primary"
          size="large"
        >
          <el-icon size="large"><Delete /></el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="详情" width="60">
      <template #default="scope">
        <el-button
          @click="showWordDialog(scope.row)"
          link
          type="primary"
          size="large"
        >
          <el-icon size="large"><View /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="单词信息" v-model="wordDialogVisible" width="30%">
    <el-form :model="currentWord" label-width="120px">
      <el-form-item label="单词">
        <el-input v-model="currentWord.word" disabled></el-input>
      </el-form-item>
      <el-form-item label="意思">
        <el-input v-model="currentWord.meaning"></el-input>
      </el-form-item>
      <el-form-item label="词性">
        <el-select v-model="currentWord.prop" placeholder="请选择词性">
        <el-option label="n." value="n."></el-option>
        <el-option label="adj." value="adj."></el-option>
        <el-option label="v." value="v."></el-option>
        <el-option label="adv." value="adv."></el-option>
        <el-option label="prep." value="prep."></el-option>
        <el-option label="phrase" value="phrase"></el-option>
      </el-select>
      </el-form-item>
      
      <el-form-item label="评分">
        <el-rate v-model="currentWord.rate"></el-rate>
      </el-form-item>
    <div slot="footer">
      <el-button @click="updateWord">修改</el-button>
    </div>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
  width: 40px;
}
</style>
