<template>
  <div class="statistics" ref="vantaRef" style="margin-top: 0px;">
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="userStore.search_sum">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                查询总次数
                <el-tooltip
                  effect="dark"
                  content="当前用户的翻译次数"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>超过用户数：</span>
              <span class="green">
                24%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="active_users">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                活跃用户数
                <el-tooltip
                  effect="dark"
                  content="网站注册用户"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>日增用户</span>
              <span class="green">
                12%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="userStore.tokens" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                用户剩余TOKEN
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from "@element-plus/icons-vue";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { GetHistorySumApi } from "@/request/api";
import { useUserstore } from "@/store/user";
import { GetActiveUser } from "@/request/api";

const sum_history = ref(0);
const new_users = ref(0);
const active_users = ref(0);
const userStore = useUserstore();
const vantaRef = ref(null);
let vantaEffect: { destroy: () => void };

onBeforeMount(async () => {
  let res = await GetHistorySumApi({
    username: userStore.userName,
  });
  res.sum.forEach((item) => {
    sum_history.value = item.count;
  });
  userStore.search_sum = sum_history.value;
  console.log("getactiveuser");
  const res2 = await GetActiveUser();
  active_users.value = res2.total_users;
  userStore.tokens = 72000;
});


</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  /*background-color: var(--el-bg-color-overlay);*/
  background-color: transparent; /* 设置为透明 */
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
