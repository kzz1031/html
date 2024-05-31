<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {GetUserInfoByPageNum} from "@/request/api";
import { Delete,Promotion,Search } from "@element-plus/icons-vue";
import {useUserstore} from '@/store/user'
import { ElMessage } from 'element-plus';
import { GetHistoryApi } from "@/request/api";
import { DeleteHistoryApi } from "@/request/api";
import router from "@/router";
interface History {
  userName: string
  original_text: string
  translated_text: string
  created_at: string
}
const input1 = ref('')
const radio1 = ref('1')

const tableData = ref<History[]>([]);
const userStore = useUserstore();

onBeforeMount(async () => {
  if(userStore.userName == '请登录'){
    ElMessage("用户未登录");
    router.push('/')
  } 
  let res = await GetHistoryApi({
    username: userStore.userName,
    order_by_time : radio1.value,
    search_content: input1.value
  })
  res.histories.forEach(item => {
    tableData.value.push({
      userName: item.username,
      original_text: item.original_text,
      translated_text: item.translated_text,
      created_at: item.created_at
    });
  });
  console.log("History");
})

const handleCurrentChange = async ( ) => {
  tableData.value = []; // 清空表格数据

  let res = await GetHistoryApi({
    username: userStore.userName,
    order_by_time : radio1.value,
    search_content: input1.value
  })
  res.histories.forEach(item => {
    tableData.value.push({
      userName: item.username,
      original_text: item.original_text,
      translated_text: item.translated_text,
      created_at: item.created_at
    });
  });
}

const deletehistory = async (index: number, row : History) => {

  try {
          const history ={
          username: row.userName,
          time : row.created_at
        }
        // 使用 HistoryApi 存储历史记录
        const response = await DeleteHistoryApi(history);

        if (response.success) {
            ElMessage.success("历史记录删除成功");
        } else {
            ElMessage.error("历史记录删除失败");
        }
    } catch (error) {
        console.error("删除历史记录时发生错误:", error);
        ElMessage.error("删除历史记录时发生错误");
    }
};

const fetchData = async () => {
  
  
};

const handleDelete = (index: number) => {
  // 删除指定索引的行
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
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="original_text" label="原文本" width="500"/>
        <el-table-column prop="translated_text" label="翻译结果" width="500"/>
        <el-table-column prop="created_at" label="时间"/>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button title="删除历史记录" @click="console.log(scope.row, scope.$index); handleDelete(scope.$index); deletehistory( scope.$index, scope.row )" link type="primary" size="large">
              <el-icon size="large"><Delete /></el-icon>
            </el-button>
            <el-button title="在主界面中打开" link type="primary" size="large">
              <el-icon size="large"><Promotion /></el-icon>
            </el-button>
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