<script setup>
import { RouterView } from 'vue-router'
import { profileData } from '@/data/profile'
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