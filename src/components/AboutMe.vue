<template>
    <el-dialog
      :model-value="visible"
      @update:model-value="$emit('update:visible', $event)"
      title="👨‍💻 关于我"
      width="500px"
      align-center
      class="glass-dialog"
    >
      <div class="about-content">
        <p>{{ content }}</p>
        
        <div class="dialog-footer">
          <el-divider border-style="dashed" class="custom-divider" />
          <el-button plain @click="$emit('update:visible', false)" class="glass-btn">
            了解到啦
          </el-button>
        </div>
      </div>
    </el-dialog>
  </template>
  
  <script setup>
  defineProps({
    visible: Boolean,
    content: String
  });
  
  defineEmits(['update:visible']);
  </script>
  
  <style scoped>
  .about-content {
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9); /* 适应暗黑背景，文字改为亮白色 */
    font-size: 15px;
    white-space: pre-wrap; 
  }
  
  .dialog-footer {
    text-align: right;
    margin-top: 20px;
  }
  
  .custom-divider {
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  /* 按钮适配毛玻璃风格 */
  .glass-btn {
    background: rgba(64, 158, 255, 0.15) !important;
    border: 1px solid rgba(64, 158, 255, 0.4) !important;
    color: #fff !important;
    transition: all 0.3s ease;
  }
  
  .glass-btn:hover {
    background: rgba(64, 158, 255, 0.35) !important;
    transform: translateY(-2px);
  }
  </style>
  
  <style>
  /* 与主页项目卡片保持 100% 一致的毛玻璃效果 */
  .glass-dialog {
    background: rgba(30, 30, 30, 0.4) !important;
    backdrop-filter: blur(15px) !important;
    -webkit-backdrop-filter: blur(15px) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  }
  
  /* 覆盖头部标题颜色 */
  .glass-dialog .el-dialog__title {
    color: #fff !important;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  /* 覆盖头部底边框线 */
  .glass-dialog .el-dialog__header {
    margin-right: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* 覆盖右上角自带的关闭 'X' 图标颜色 */
  .glass-dialog .el-dialog__headerbtn .el-dialog__close {
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.3s;
  }
  
  .glass-dialog .el-dialog__headerbtn:hover .el-dialog__close {
    color: #409EFF;
  }
  </style>