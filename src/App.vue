<script setup>
import { onMounted } from "vue";
import { RouterView } from 'vue-router'
import { profileData } from '@/data/profile'

onMounted(() => {
  const originalTitle = document.title; 

  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = '404 Not Found - 精神出走中...';
    } else {
      document.title = '200 OK - 重新连接成功！';
      setTimeout(() => {
        document.title = originalTitle;
      }, 2000);
    }
  });
})
</script>

<template>
  <div 
      class="global-bg" 
      :style="{ backgroundImage: `url(${profileData.background})` }"
  ></div>

  <RouterView />
</template>

<style scoped>
.global-bg {
  position: fixed;
  top: 0; 
  left: 0;
  width: 100vw; 
  height: 100vh;
  height: 100lvh; 
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  filter: brightness(0.8) saturate(1.1);
}
</style>