<template>
  <div id="global-header">
    <a-row
      id="globalHeader"
      :wrap="false"
      align="center"
      style="margin-bottom: 16px"
    >
      <a-col flex="auto">
        <a-menu
          :selected-keys="selectedKeys"
          mode="horizontal"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img alt="oj-logo" class="logo" src="../assets/huaji.gif" />
              <div class="title">⭐C⭐ Team Welcomes You!</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path"
            >{{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
// 路由
const router = useRouter();
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    //是否在菜单中可见
    if (item.meta?.hideInMenu) return false;
    else return true;
  });
});
const selectedKeys = ref(["/"]); //默认是主页
// 路由跳转时更新选中菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({ path: key });
};
</script>

<style scoped>
#global-header {
}

.title-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 58px;
}

.title {
  color: #444;
  margin-left: 16px;
  font-size: 32px;
}
</style>
