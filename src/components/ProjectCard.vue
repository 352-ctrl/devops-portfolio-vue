<template>
    <div v-if="isEmpty || !project" class="empty-slot"></div>
    <el-card v-else class="glass-card project-card" shadow="hover" @click="$emit('click', project?.id)">
      <div class="project-cover">
        <img :src="project?.cover" alt="项目封面" />
      </div>
      
      <div class="project-overlay">
        <div class="overlay-content">
          <h3>{{ project?.title }}</h3>
          <p class="description">{{ project?.description }}</p>
        </div>
      </div>
    </el-card>
  </template>
  
  <script setup>
  defineProps({ project: Object, isEmpty: Boolean });
  defineEmits(['click']);
  </script>
  
  <style scoped>
  .glass-card {
    background: rgba(30, 30, 30, 0.25) !important; 
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 12px;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    
    /* 确保外层严格受控 */
    position: relative; 
    overflow: hidden !important; 
    box-sizing: border-box;
  }
  
  .project-card:hover { 
    transform: translateY(-5px); 
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
  }
  
  /* 核心修复点：重置 el-card 内部实体容器的尺寸与溢出边界 */
  :deep(.el-card__body) { 
    padding: 0 !important; 
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden !important;
    box-sizing: border-box;
  }
  
  .project-cover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0; left: 0;
  }
  
  .project-cover img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    display: block; 
    transition: transform 0.5s ease;
  }
  
  .project-card:hover .project-cover img {
    transform: scale(1.08);
  }
  
  /* 遮罩层加固 */
  .project-overlay { 
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 40%, transparent 100%);
    transition: background 0.3s ease;
    
    /* 杜绝自身内容溢出触发滚动条，且禁用鼠标事件以防 hover 闪烁 */
    overflow: hidden;
    box-sizing: border-box;
    pointer-events: none; 
  }
  
  .project-card:hover .project-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.2) 100%);
  }
  
  .overlay-content {
    padding: 15px 12px;
    color: #fff;
    transform: translateY(36px);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    width: 100%;
    box-sizing: border-box;
  }
  
  .project-card:hover .overlay-content {
    transform: translateY(0);
  }
  
  .overlay-content h3 { 
    font-size: 16px; 
    margin: 0 0 6px 0; 
    color: #fff;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0,0,0,0.6);
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  
  .description { 
    font-size: 13px; 
    color: rgba(255, 255, 255, 0.85); 
    margin: 0; 
    line-height: 1.4; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
    overflow: hidden; 
    height: 36px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .project-card:hover .description {
    opacity: 1;
  }
  
  .empty-slot { height: 100%; }
  </style>