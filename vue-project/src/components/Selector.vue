<template>
  <el-select v-model="value" placeholder="Select" style="width: 240px">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: '英文翻译成中文',
    label: 'EN -> CH',
  },
  {
    value: '中文翻译成英文',
    label: 'CH -> EN',
    disabled: false,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

</script>