<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import { useUserstore } from '@/store/user';
import { Delete,Promotion,Search, EditPen } from "@element-plus/icons-vue";

import type { NumericLiteral } from "typescript";
import router from "@/router";
import { GetPretranslationApi, DeletePretranslationApi, UpdatePretranslation } from "@/request/api";
import { ElMessage } from "element-plus";

interface Translation {
  updated_at: string,
  userName: string
  wish: string,
  raw_wish: string,
  translation: string,
  created_at: string,
  raw_created_at: string,  // 原始未格式化的创建时间
}
const currentPretranslation = ref<Translation>({
  updated_at: "",
  userName: "",
  wish: "",
  raw_wish: "",
  translation: "",
  created_at: "",
  raw_created_at: ""
});
const input1 = ref('')
const radio1 = ref('1')
const dialogVisible = ref(false)

const tableData = ref<Translation[]>([]);
const userStore = useUserstore();
const searchQuery = ref("");

const deletecpretranslation = async (index: number, row : Translation) => {
  console.log('delete pretranslation')
  try {
        const translation ={
        username: row.userName,
        time : row.raw_created_at
      }
      // 使用 HistoryApi 存储历史记录
      const response = await DeletePretranslationApi(translation);

      if (response.success) {
          ElMessage.success("偏好单词删除成功");
      } else {
          ElMessage.error("偏好单词删除失败");
      }
  } catch (error) {
      console.error("删除偏好单词时发生错误:", error);
      ElMessage.error("删除偏好单词时发生错误");
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('.')[0].replace('T', ' ');  // ISO字符串是 "YYYY-MM-DDTHH:MM:SS.sssZ" 格式
}

onBeforeMount(async () => {
    if(userStore.userName == '请登录'){
        ElMessage("用户未登录");
        router.push('/')
    }  
    let res = await GetPretranslationApi({ 
        username: userStore.userName,
        order_by_time : radio1.value,
        search_content: input1.value });
    console.log("API Response:", res);
    if (res && res.pretranslations) {
      res.pretranslations.forEach(item => {
          tableData.value.push({
              userName: item.username,
              wish: item.wish,
              raw_wish: item.wish,
              translation: item.translation,
              created_at: formatDate(item.created_at),
              updated_at: formatDate(item.updated_at),
              raw_created_at: item.created_at
        });
      });
      console.log("Prefertranslation loaded.");
    }else {
      console.error("No translations received or API response structure is incorrect.");
    }
});

const handleCurrentChange = async ( ) => {
  tableData.value = []; // 清空表格数据

  let res = await GetPretranslationApi({
    username: userStore.userName,
    order_by_time : radio1.value,
    search_content: input1.value
  })
  res.pretranslations.forEach(item => {
    tableData.value.push({
        userName: item.username,
        wish: item.wish,
        raw_wish: item.wish,
        translation: item.translation,
        created_at: formatDate(item.created_at),
        updated_at: formatDate(item.updated_at),
        raw_created_at: item.created_at
    });
  });
}

const PretranslationUpdate = async (currentPretranslation: Translation) => {
  const Translation = {
    updated_at: currentPretranslation.updated_at,
    username: userStore.userName,
    wish: currentPretranslation.wish,
    raw_wish: currentPretranslation.raw_wish,
    translation: currentPretranslation.translation,
    raw_created_at : currentPretranslation.raw_created_at,
  }
  console.log("hello");
  console.log(currentPretranslation.wish, currentPretranslation.translation, currentPretranslation.raw_wish);
  dialogVisible.value = false;
  const response = await UpdatePretranslation(Translation);
  if(response.success) {
    ElMessage.success('修改成功')
    const index = tableData.value.findIndex(p => p.raw_created_at === currentPretranslation.raw_created_at && p.userName === userStore.userName);
    if (index !== -1) {
      tableData.value[index] = { ...tableData.value[index], ...currentPretranslation };
    }
    console.log("Table updated successfully.");
  }
  else {
    ElMessage.error('修改失败')
  }
};
const showDialog = (pretranslation: Translation) => {
    dialogVisible.value = true;
    currentPretranslation.value = { ...pretranslation, raw_wish: pretranslation.wish };
}
const filteredPretranslation = computed(() => {
  return tableData.value.filter((pretranslation) =>
    pretranslation.wish.includes(searchQuery.value)
  );
});

const handlePromotion = (row: Translation) => {
  userStore.wishes = row.wish; 
  userStore.translations = row.translation;
  console.log(userStore.wishes,userStore.translations);
  router.push('/');
};
const handleDelete = (index: number) => {
  console.log(index);
  tableData.value.splice(index, 1);
};
</script>

<template>
    <div class="center-container">
      <el-input v-model="input1" style="width: 500px" size="large" placeholder="Please Input">
        <template #append>
          <el-button :icon="Search" @click="handleCurrentChange"/>
        </template>
      </el-input>
      <el-radio-group v-model="radio1" class="ml-4" @change="handleCurrentChange">
        <el-radio value="1" size="large" style="margin-left: 50px">时间降序</el-radio>
        <el-radio value="2" size="large">时间升序</el-radio>
      </el-radio-group>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="filteredPretranslation" stripe style="width: 100%">
          <el-table-column prop="wish" label="原文本" width="480"/>
          <el-table-column prop="translation" label="偏好翻译" width="480"/>
          <el-table-column prop="updated_at" label="更新时间"/>
          <el-table-column prop="created_at" label="创建时间"/>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button title="删除偏好单词" @click="console.log(scope.row, scope.$index); handleDelete(scope.$index); deletecpretranslation( scope.$index, scope.row )" link type="primary" size="large">
                <el-icon size="large"><Delete /></el-icon>
              </el-button>
              <el-button title="修改偏好单词" link type="primary" size="large" @click="showDialog(scope.row)">
                <el-icon size = 'large'><EditPen /></el-icon>
              </el-button>
              <el-dialog title="偏好信息"v-model="dialogVisible" width="30%" draggable="true">
                <el-form>
                  <el-form-item label="原始文本">
                    <el-input v-model="currentPretranslation.wish" ></el-input>
                  </el-form-item>
                  <el-form-item label="偏好翻译">
                    <el-input v-model="currentPretranslation.translation" ></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="PretranslationUpdate(currentPretranslation)">修改</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  
    <el-pagination
        @current-change="handleCurrentChange"
    />
  
  </template>
  
  <style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  </style>