//Index.vue
<script setup lang="ts">
import AsideNavBar from "@/components/AsideNavBar.vue";
import Header from "@/components/Header.vue";
import IndexMain from "@/components/IndexMain.vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header>

        </Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideNavBar></AsideNavBar>
        </el-aside>

        <el-container>
          <el-main>

            <router-view></router-view>

          </el-main>
        </el-container>

      </el-container>

    </el-container>

  </div>
</template>

<style scoped>

</style>