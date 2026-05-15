<template>
  <div class="kaygb-layout">

    <div class="detail-container">
      <div class="nav-header">
        <el-button class="back-btn" @click="goBack">
          <el-icon><ArrowLeft /></el-icon> 返回首页
        </el-button>
      </div>

      <el-card v-if="project" class="glass-card project-detail-card">
        <div class="cover-wrapper">
          <img :src="project.cover" :alt="project.title" />
        </div>

        <div class="content-wrapper">
          <div class="title-section">
            <h1 class="title">{{ project.title }}</h1>
            
            <el-tooltip v-if="project.github" content="前往 GitHub 仓库" placement="top" effect="light">
              <a :href="project.github" target="_blank" class="github-link-btn">
                <el-icon class="btn-icon">
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 27.9 22.5 21.5C835.6 883.6 960 717.3 960 523.6 959.8 276.5 759.5 76.3 511.6 76.3z"></path></svg>
                </el-icon>
                <span class="btn-text">查看源码</span>
              </a>
            </el-tooltip>
          </div>
          
          <div class="tags-bar" v-if="project.tags && project.tags.length">
            <el-tag 
              v-for="(tag, index) in project.tags" 
              :key="index"
              effect="dark" 
              :color="tag.color" 
              class="custom-tag"
            >
              {{ tag.name }}
            </el-tag>
          </div>

          <el-divider border-style="dashed" class="custom-divider" />

          <template v-if="project.articleBlocks && project.articleBlocks.length">
            <div 
              v-for="(block, index) in project.articleBlocks" 
              :key="index" 
              class="section-block"
            >
              <h3>{{ block.title }}</h3>
              
              <p v-if="block.type === 'text'" class="desc-text">{{ block.content }}</p>
              
              <div v-else-if="block.type === 'code'" class="code-container">
                <div class="code-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="code-lang">{{ block.language }}</span>
                </div>
                <pre><code>{{ block.code }}</code></pre>
              </div>
            </div>
          </template>
          
          <template v-else>
            <div class="section-block">
              <h3>项目概述</h3>
              <p class="desc-text">{{ project.description }}</p>
            </div>
          </template>

        </div>
      </el-card>

      <el-empty v-else description="未检索到对应的项目实体信息" class="glass-card empty-card">
        <el-button type="primary" @click="goBack">返回主控制台</el-button>
      </el-empty>
    </div>

    <div class="footer-wrapper">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Link } from '@element-plus/icons-vue'
import { projects } from '@/data/projects'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const router = useRouter()
const project = ref(null)

onMounted(() => {
  const targetId = route.params.id
  project.value = projects.find(p => p.id === targetId) || null
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.kaygb-layout {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 0 0 0;
  box-sizing: border-box;
}

.detail-container {
  width: 95%;
  max-width: 850px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.nav-header {
  margin-bottom: 20px;
  width: 100%;
}

.back-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #fff !important;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  color: #409EFF !important;
  transform: translateX(-4px);
}

.project-detail-card {
  background: rgba(30, 30, 30, 0.4) !important;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

:deep(.el-card__body) {
  padding: 0 !important;
}

.cover-wrapper {
  width: 100%;
  height: 320px;
  position: relative;
  overflow: hidden;
}

.cover-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cover-wrapper::after {
  content: "";
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 80px;
  background: linear-gradient(to top, rgba(30, 30, 30, 0.6), transparent);
}

.content-wrapper {
  padding: 35px 40px;
  color: #fff;
}

.title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 16px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.github-link-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  line-height: 1;
}

.github-link-btn:hover {
  background: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255,255,255,0.2);
}

.btn-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
}

.btn-text {
  font-size: 14px;
  font-weight: 500;
  transform: translateY(0.5px); 
}

.tags-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.custom-tag {
  border: none !important;
  border-radius: 4px;
  font-weight: 500;
}

.custom-divider {
  border-color: rgba(255, 255, 255, 0.15);
  margin: 20px 0 30px 0;
}

.section-block {
  margin-bottom: 30px;
}

.section-block h3 {
  font-size: 18px;
  color: #409EFF;
  margin-bottom: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.section-block h3::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 16px;
  background: #409EFF;
  margin-right: 8px;
  border-radius: 2px;
}

.desc-text {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin: 0;
  text-align: justify;
}

/* 终端风格代码块 UI */
.code-container {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code-header {
  background: #2d2d2d;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.code-lang {
  margin-left: auto;
  color: #858585;
  font-size: 12px;
  text-transform: uppercase;
  font-family: monospace;
}

.code-container pre {
  margin: 0;
  padding: 15px;
  overflow-x: auto;
}

.code-container code {
  font-family: 'Fira Code', Consolas, Monaco, monospace;
  font-size: 14px;
  color: #d4d4d4;
  line-height: 1.5;
  white-space: pre;
}

.empty-card {
  padding: 80px 0;
  text-align: center;
  background: rgba(30, 30, 30, 0.3) !important;
  backdrop-filter: blur(10px);
  border-radius: 12px;
}

.footer-wrapper {
  margin-top: auto;
  width: 100%;
  padding: 40px 0 20px 0;
}

@media screen and (max-width: 650px) {
  .cover-wrapper { height: 220px; }
  .content-wrapper { padding: 25px 20px; }
  .title-section { flex-direction: column; align-items: flex-start; gap: 10px; }
  .title { font-size: 22px; }
  .kaygb-layout { padding: 20px 0 0 0; }
}
</style>