<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { GetCollectionApi } from "@/request/api";
import { useUserstore } from '@/store/user';
import { Delete,Promotion,Search } from "@element-plus/icons-vue";

import type { NumericLiteral } from "typescript";
import router from "@/router";
import { DeleteCollectionApi } from "@/request/api";
import { ElMessage } from "element-plus";

interface Collection {
  id: number,
  collection_id: number,
  original_text: string,
  translated_text: string;
}

const tableData = ref<Collection[]>([]);
const userStore = useUserstore();

const handlePromotion = (row: Collection) => {
  userStore.originalText = row.original_text; 
  userStore.translatedText = row.translated_text;
  console.log(userStore.originalText,userStore.translatedText);
  router.push('/');
};

const handleDelete = (index: number) => {
  // 删除指定索引的行
  console.log(index);
  tableData.value.splice(index, 1);
};

const deletecollection = async (row: Collection) =>{
  console.log('delete collection')
  try{
    const response = await DeleteCollectionApi({collection_id: row.collection_id});
    if(response.success) {
      ElMessage.success("收藏删除成功")
    }
    else{
      ElMessage.error("收藏删除失败")
    }
  } catch (error){
    console.error("收藏删除失败")
  }

}

onBeforeMount(async () => {
  let res = await GetCollectionApi({ username: userStore.userName });
  if (res.collections) {
    let i = 1;
    res.collections.forEach(item => {
      tableData.value.push({
        id : i++,
        collection_id : item.collection_id,
        original_text: item.original_text,
        translated_text: item.translated_text,
      });
    });
  }
});
</script>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="序号" class="id-column custom-column" width="60"/>
          <el-table-column prop="original_text" label="原文本" class='original-column custom-column'/>
          <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button title="删除历史记录" @click="console.log(scope.row, scope.$index); handleDelete(scope.$index); deletecollection( scope.row );" link type="primary" size="large">
              <el-icon size="large"><Delete /></el-icon>
            </el-button>
            <el-button title="在主界面中打开" link type="primary" size="large" @click="handlePromotion(scope.row)">
              <el-icon size="large" ><Promotion /></el-icon>
            </el-button>
          </template>
        </el-table-column>
          <el-table-column type="expand" class="custom-column">
            <template #default="{ row }">
              <div style="padding: 10px; margin-bottom: 0px;" class="expand-column">
                <p style="font-size: 16px; color: #3375b9;">翻译结果:</p>
                <p>{{ row.translated_text }}</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.custom-column .cell {
  padding: 10px; /* 设置列内的单元格的内边距 */
}

.original-column {
  background-color: #3375b9; /* 设置原文本列的背景颜色 */
}

.expand-column {
  background-color: #CFD3DC; /* 设置展开文本列的背景颜色 */
}

/* 设置列之间的间距 */
.el-table .el-table__header-wrapper th,
.el-table .el-table__body-wrapper td {
  padding: 0 16px; /* 设置列之间的间距 */
}

.id-column {
  background-color: #f0f0f0; /* 设置 ID 列的背景颜色 */
}
</style>
