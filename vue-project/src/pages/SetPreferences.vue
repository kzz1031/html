<script setup lang="ts">
    import PreferenceDrawer from "@/components/PreferenceDrawer.vue";
    import SpaceSize from "@/components/SpaceSize.vue";
    import AsideNavBar from "@/components/AsideNavBar.vue";
    import Header from "@/components/Header.vue";
    import { ElContainer, ElHeader, ElMain, ElAside } from 'element-plus';

</script>


<template>
    <div class="common-layout">
        <el-container class="layout-container-demo" style="height: 100%">
            <AsideNavBar></AsideNavBar>
            <el-container>
                <el-header class="custom-header">
                    <Header>
                    </Header>
                </el-header>
                <el-main>
                    <el-row :gutter="20">
                        <!-- 1.个人偏好按钮弹抽屉方向设置 （放位置是一个新的列）-->
                        <el-col :span="20" :offset="2">
                            <div class="preference-box">
                                <PreferenceDrawer></PreferenceDrawer>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <!-- <el-col :span="20" :offset="2">
                            <div class="grid-content ep-bg-purple">
                                <SpaceSize></SpaceSize>
                            </div>
                                
                        </el-col> -->
                    </el-row>
                        <el-row :gutter="20">
                        
                    </el-row>
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
    </div>
  </template>
  
  <style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  
  .preference-box {
    border: 2px solid #AAA; /* 统一边框样式 */
    
    border-radius: 4px;
    padding: 10px; /* 内边距 */
    display: flex; /* 使用Flexbox进行布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    min-height: 150px; /* 统一高度 */
  }
  .grid-content {
    border: 2px solid #AAA; /* 统一边框样式 */
    
    border-radius: 4px;
    padding: 10px; /* 内边距 */
    
    min-height: 150px; /* 统一高度 */
  }
  
  .custom-header {
    margin-bottom: 10px
}

.header-title {
    margin: 0; /* 移除默认的 margin */
    font-size: 24px; /* 字体大小，根据需要调整 */
    font-weight: bold; /* 字体加粗 */
}
  </style>