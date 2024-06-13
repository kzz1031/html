<template>
  <Header></Header>
  <TestComp></TestComp>
  <div>
    <el-button type="primary" @click="jumptoMain" class="bottom-right-button">
      <el-icon :size="24">
        <Right />
      </el-icon>
    </el-button>
  </div>

</template>

<script lang="ts" setup>
import router from '@/router';
import TestComp from '@/components/Testcomp.vue'
import Header from '@/components/Header.vue';
import { Right } from '@element-plus/icons-vue';
import { ref } from 'vue';
const value = ref(0)
function jumptoMain(){
  router.push('/');
}
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.bottom-right-button {
  position: absolute;
  bottom: 40px;
  right: 40px;
}
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>