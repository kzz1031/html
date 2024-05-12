<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { GetCollectionApi } from "@/request/api";
import { useUserstore } from '@/store/user';

interface Collection {
  original_text: string;
  translated_text: string;
}

const tableData = ref<Collection[]>([]);
const userStore = useUserstore();

onBeforeMount(async () => {
  let res = await GetCollectionApi({ username: userStore.userName });
  if (res.collections) {
    res.collections.forEach(item => {
      tableData.value.push({
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
          <!-- 原文本列 -->
          <el-table-column prop="original_text" label="原文本" />
          
          <!-- 折叠面板列 -->
          <el-table-column type="expand">
            <template #default="{ row }">
              <!-- 展开的内容是翻译文本 -->
              <div style="padding: 10px;">
                <p style="font-size: 16px;">翻译结果:</p>
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
</style>
