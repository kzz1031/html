<script setup lang="ts">
    import PreferenceDrawer from "@/components/PreferenceDrawer.vue";
    import AsideNavBar from "@/components/AsideNavBar.vue";
    import { ElContainer, ElHeader, ElMain, ElAside } from 'element-plus';

</script>


<template>
    <div class="common-layout">
        <el-container class="layout-container-demo" style="height: 100%">
            <AsideNavBar></AsideNavBar>
            <el-container>
                <el-header class="custom-header">
                    <h1 class="header-title">页面偏好设置</h1>
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
                        <el-col :span="20" :offset="2">
                            <div class="grid-content ep-bg-purple" />
                        </el-col>
                    </el-row>
                        <el-row :gutter="20">
                        <el-col :span="20" :offset="2">
                            <div class="grid-content ep-bg-purple" />
                        </el-col>
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
  
  .grid-content, .preference-box {
    border: 2px solid #AAA; /* 统一边框样式 */
    background-color: #f2f2f2; /* 浅灰色背景 */
    border-radius: 4px;
    padding: 10px; /* 内边距 */
    display: flex; /* 使用Flexbox进行布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 150px; /* 统一高度 */
  }
  .custom-header {
    display: flex; /* 使用 Flexbox 进行布局 */
    justify-content: center; /* 水平居中标题 */
    align-items: center; /* 垂直居中标题 */
    background-color: #333; /* 背景色，可根据需要调整 */
    color: #fff; /* 字体颜色，确保与背景色对比度高 */
}

.header-title {
    margin: 0; /* 移除默认的 margin */
    font-size: 24px; /* 字体大小，根据需要调整 */
    font-weight: bold; /* 字体加粗 */
}
  </style>