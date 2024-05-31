<template>
  <el-table :data="translations" style="width: 100%" border stripe>
    <el-table-column prop="timestamp" label="Date" width="180" sortable :formatter="formatDate"/>
    <el-table-column label="Translation Details">
      <el-table-column prop="type" label="Type" width="120" />
      <el-table-column label="Texts">
        <el-table-column prop="original_text" label="Original Text" width="250" />
        <el-table-column prop="translated_text" label="Translated Text" width="250" />
        <el-table-column prop="preferred_text" label="Modified Text (User Preference)" width="250" />
      </el-table-column>
      <el-table-column label="Actions" width="160">
        <template #default="{ row }">
          <el-button size="small" type="danger" @click="deleteTranslation(row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessageBox } from 'element-plus';
import type { PropType } from 'vue';  // 使用 import type 导入 PropType
import type { TranslationRecord } from '@/request/api'; 

export default defineComponent({
  props: {
    translations: Array as PropType<TranslationRecord[]>,
  },
  methods: {
    formatDate(value: string) {
      const date = new Date(value);
      return date.toLocaleDateString();
    },
    deleteTranslation(id: number) {
      ElMessageBox.confirm('您确定要删除这条记录吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id);
      }).catch(() => {
        // 处理取消操作
      });
    }
  }
});
</script>
