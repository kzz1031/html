<template>
  <div ref="vantaRef" class="login-page">
    <!-- 导入 LoginForm 组件 -->
    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';
// 导入 LoginForm 组件
import LoginForm from '@/components/LoginForm.vue';

const vantaRef = ref(null);
let vantaEffect: { destroy: () => void; };

onMounted(() => {
  vantaEffect = BIRDS({
    el: vantaRef.value,
    THREE: THREE,
    backgroundColor: 0x7d7df5
  });
});

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }
});
</script>

<style>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使用 100% 的视口高度 */
}
</style>
