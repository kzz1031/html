//Index.vue
<script setup lang="ts">
import AsideNavBar from "@/components/AsideNavBar.vue";
import Header from "@/components/Header.vue";
import IndexHistory from "@/components/IndexHistory.vue";
import { GetHistoryApi } from "@/request/api";
import {onBeforeMount, ref} from "vue";
import {useUserstore} from '@/store/user'

const userStore=useUserstore()

</script>

<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <AsideNavBar></AsideNavBar>
    <el-container>
      <el-header>
        <Header>
        </Header>
      </el-header>
        <el-container>
          <el-main>
            <IndexHistory></IndexHistory>
          </el-main>
        </el-container>
    </el-container>

  </el-container>
</template>

<style scoped>

</style>