<template>
  <footer class="app-footer">
    <div class="footer-content">
      <span class="copyright">© 2026 CTRL</span>
      <el-divider direction="vertical" class="footer-divider" />
      <div class="info-group">
        <a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2026016183号</a>
        <el-divider direction="vertical" class="footer-divider" />
        <span>Power by Vue 3 & Element Plus</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  text-align: center;
}

.footer-content {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  transition: all 0.3s ease;
}

.beian-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s;
}

.beian-link:hover {
  color: #409eff;
}

.info-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media screen and (max-width: 550px) {
  .footer-content {
    flex-direction: column;
    gap: 8px;
  }
  
  .footer-divider {
    display: none !important;
  }

  .info-group {
    flex-direction: column;
    gap: 4px;
  }
}
</style>