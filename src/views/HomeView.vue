<template>
  <div 
    class="kaygb-layout no-select"
    @mousedown="onDragStart"
    @mouseup="onDragEnd"
    @mouseleave="onDragEnd"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >

    <div class="main-container">
      <div class="sidebar">
        <div class="profile-content">
          <div class="avatar-frame">
            <el-avatar :size="130" :src="profileData.avatar" class="avatar-img swing-avatar" />
          </div>
          <h1 class="name">{{ profileData.name }}</h1>
          <p class="bio">{{ profileData.bioSubtitle }} <br/> {{ profileData.bioDescription }}</p>
          
          <div class="tech-tags">
            <el-tag 
              v-for="(tag, index) in profileData.skills" 
              :key="index" 
              :color="tag.color" 
              effect="dark" 
              class="custom-tag"
            >
              {{ tag.name }}
            </el-tag>
          </div>

          <el-divider border-style="dashed" class="divider" />

          <div class="contact-bar">
            <el-tooltip content="关于我" placement="bottom" effect="light">
              <el-button circle class="icon-btn hover-about" @click="showAbout = true">
                <el-icon><User /></el-icon>
              </el-button>
            </el-tooltip>

            <el-tooltip content="GitHub" placement="bottom" effect="light">
              <el-button circle class="icon-btn hover-github" tag="a" :href="profileData.socials.github" target="_blank">
                <el-icon>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 27.9 22.5 21.5C835.6 883.6 960 717.3 960 523.6 959.8 276.5 759.5 76.3 511.6 76.3z"></path></svg>
                </el-icon>
              </el-button>
            </el-tooltip>

            <el-tooltip content="QQ" placement="bottom" effect="light">
              <el-button circle class="icon-btn hover-qq" @click="handleCopy(profileData.socials.qq, 'QQ号')">
                <el-icon>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.8 112 511.4 112 332.6 112 256.2 262.2 260.6 447.9c-28.4 70.8-46.7 113.9-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.7 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-109.9 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"></path></svg>
                </el-icon>
              </el-button>
            </el-tooltip>

            <el-tooltip content="邮箱" placement="bottom" effect="light">
              <el-button circle class="icon-btn hover-mail" @click="handleCopy(profileData.socials.email, '邮箱地址')">
                <el-icon><Message /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </div>

      <div class="projects-board">
        <h2 class="board-title">项目实战</h2>
        
        <el-carousel 
          ref="carouselRef"
          v-if="chunkedProjects.length > 0" 
          :height="carouselDynamicHeight" 
          :autoplay="false" 
          arrow="never"
          indicator-position="none"
          @change="handleCarouselChange"
        >
          <el-carousel-item v-for="(page, pageIndex) in chunkedProjects" :key="pageIndex">
            <el-row :gutter="30" class="strict-row">
              <el-col 
                :xs="12" :sm="12" :md="12" :lg="8" :xl="8" 
                v-for="index in chunkSize" :key="index" 
                class="project-col"
              >
                <ProjectCard 
                  :isEmpty="!page[index-1]"
                  :project="page[index-1]"
                  @click="goToProject"
                />
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>

        <div class="custom-indicators" v-if="chunkedProjects.length > 1">
          <div 
            v-for="pageIndex in visibleIndicators" 
            :key="pageIndex"
            class="indicator-dot"
            :class="{ 'is-active': pageIndex === currentIndex }"
            @click="carouselRef.setActiveItem(pageIndex)"
          ></div>
        </div>
      </div>
    </div>

    <div class="footer-wrapper">
      <AppFooter />
    </div>

    <AboutMe 
      v-model:visible="showAbout" 
      :content="profileData.aboutMe" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, Message } from '@element-plus/icons-vue' 
import { ElMessage } from 'element-plus' 
import { projects } from '@/data/projects'
import { profileData } from '@/data/profile'
import AppFooter from '@/components/AppFooter.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import AboutMe from '@/components/AboutMe.vue'

const router = useRouter()
const showAbout = ref(false)
const carouselRef = ref(null)
const currentIndex = ref(0)
const windowWidth = ref(window.innerWidth)

const handleCopy = async (text, label) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage({
      message: `🎉 ${label}已成功复制到剪切板！`,
      type: 'success',
      duration: 2000,
      grouping: true 
    })
  } catch (err) {
    ElMessage.error('复制失败，请尝试手动截取')
  }
}

const colsCount = computed(() => {
  if (windowWidth.value >= 1200) return 3 
  if (windowWidth.value > 550) return 2   
  return 1                                
})

const chunkSize = computed(() => {
  if (colsCount.value === 3) return 6 
  if (colsCount.value === 2) return 4 
  return 3                                                                            
})

const chunkedProjects = computed(() => {
  const chunks = []
  const size = chunkSize.value
  for (let i = 0; i < projects.length; i += size) {
    chunks.push(projects.slice(i, i + size))
  }
  return chunks
})

const carouselDynamicHeight = computed(() => {
  if (colsCount.value === 3) return '480px' 
  if (!chunkedProjects.value || chunkedProjects.value.length === 0) return '240px'
  const currentPageItemsCount = chunkedProjects.value[currentIndex.value]?.length || 0
  const rowsNeeded = Math.ceil(currentPageItemsCount / colsCount.value) || 1
  return `${rowsNeeded * 236}px`
})

const handleCarouselChange = (index) => { currentIndex.value = index }

const visibleIndicators = computed(() => {
  const total = chunkedProjects.value.length
  if (total <= 3) return Array.from({ length: total }, (_, i) => i)
  if (currentIndex.value === 0) return [0, 1, 2]
  if (currentIndex.value === total - 1) return [total - 3, total - 2, total - 1]
  return [currentIndex.value - 1, currentIndex.value, currentIndex.value + 1]
})

let startX = 0;
let isDragging = false;

const onDragStart = (e) => { 
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.icon-btn')) return;
  startX = e.clientX; 
  isDragging = true; 
}
const onDragEnd = (e) => {
  if (!isDragging) return;
  isDragging = false;
  const diff = startX - e.clientX;
  if (diff > 80) carouselRef.value?.next();
  else if (diff < -80) carouselRef.value?.prev();
}

const onTouchStart = (e) => { 
  startX = e.touches[0].clientX; 
  isDragging = true; 
}
const onTouchEnd = (e) => {
  if (!isDragging) return;
  isDragging = false;
  const diff = startX - e.changedTouches[0].clientX;
  if (diff > 50) carouselRef.value?.next();
  else if (diff < -50) carouselRef.value?.prev();
}

const updateLayout = () => {
  windowWidth.value = window.innerWidth;
  if (currentIndex.value >= chunkedProjects.value.length) {
    currentIndex.value = Math.max(0, chunkedProjects.value.length - 1)
  }
}

const goToProject = (id) => { router.push(`/project/${id}`) }

onMounted(() => {
  window.addEventListener('resize', updateLayout)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})
</script>

<style scoped>
:deep(.el-carousel__container) {
  transition: height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.kaygb-layout { 
  min-height: 100vh; 
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  position: relative; 
  overflow-y: auto; 
  overflow-x: hidden; 
  padding: 60px 0 0 0;
  box-sizing: border-box;
}
  
.main-container {
  width: 95%; 
  max-width: 1400px; 
  display: flex; 
  gap: clamp(30px, 6vw, 100px); 
  align-items: center; 
  justify-content: center;
  z-index: 1;
}

.sidebar { width: 380px; flex-shrink: 0; text-align: center; color: #fff; }

.avatar-frame {
  position: relative;
  /* 微调外框尺寸以适应变薄的 padding，保持内切头像 130px */
  width: 138px;
  height: 138px;
  margin: 0 auto 20px auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #8b5cf6, #12B7F5, #FFB300, #8b5cf6);
  background-size: 400% 400%;
  animation: frameGradientMove 6s ease infinite;
  /* 📢 核心修改：通过减小 padding 让头像框变薄 */
  padding: 2px; 
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
}

.avatar-frame:hover {
  transform: scale(1.03);
  box-shadow: 0 0 25px rgba(18, 183, 245, 0.6);
}

.avatar-img { 
  border: 2px solid rgba(255, 255, 255, 0.9) !important; 
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  display: block;
}

.swing-avatar { transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
.avatar-frame:hover .swing-avatar { transform: rotate(360deg); }

@keyframes frameGradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.name { font-size: 38px; margin: 10px 0; }
.bio { color: rgba(255, 255, 255, 0.7); font-size: 16px; margin-bottom: 25px; }

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px; 
  margin-bottom: 20px;
}
.custom-tag { border: none !important; }

.contact-bar { display: flex; justify-content: center; gap: 8px; }
.icon-btn { 
  background: transparent !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; 
  color: #fff !important; width: 34px !important; height: 34px !important; font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.icon-btn.hover-about:hover { background: #8b5cf6 !important; border-color: #8b5cf6 !important; }
.icon-btn.hover-github:hover { background: #24292e !important; border-color: #24292e !important; }
.icon-btn.hover-qq:hover { background: #12B7F5 !important; border-color: #12B7F5 !important; }
.icon-btn.hover-mail:hover { background: #FFB300 !important; border-color: #FFB300 !important; }

.projects-board { flex-grow: 1; max-width: 950px; overflow: hidden; }
.board-title { color: #fff; margin-bottom: 20px; font-size: 26px; }

.project-col { margin-bottom: 16px; height: 220px; }

.custom-indicators { display: flex; justify-content: center; gap: 10px; margin-top: 5px; }
.indicator-dot { 
  width: 24px; height: 5px; 
  background: rgba(255, 255, 255, 0.2); 
  cursor: pointer; border-radius: 4px; 
  transition: background-color 0.3s;
}
.indicator-dot.is-active { background: #fff; }

.footer-wrapper { 
  margin-top: auto; 
  width: 100%; 
  position: relative;
  padding: 40px 0 20px 0;
}

@media screen and (max-width: 1200px) {
  .main-container { flex-direction: column; gap: 40px; padding-top: 20px; }
  .sidebar { width: 100%; }
  .projects-board { width: 100%; max-width: 900px; }
}

@media screen and (max-width: 550px) {
  .projects-board { max-width: 100%; padding: 0 10px; }
  .project-col { 
    width: 100% !important; 
    max-width: 100% !important; 
    flex: 0 0 100% !important; 
  }
}
</style>