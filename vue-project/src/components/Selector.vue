<template>
  <el-select v-model="lvalue" placeholder="请选择语言" style="width: 200px" @change="handleClick" id="language_selector">
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
import { defineEmits } from 'vue'
const lvalue = ref('中文翻译成英文')
const emit = defineEmits(['handleValueChange'])
const handleClick = () => {
  emit('handleValueChange', lvalue.value);
}
const options = [
  {
    value: '英文翻译成中文',
    label: '英文 -> 中文',
  },
  {
    value: '中文翻译成英文',
    label: '中文 -> 英文',
    disabled: false,
  },
]

</script>
<style scoped>
</style>