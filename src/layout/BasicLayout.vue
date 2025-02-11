<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100dvh">
      <a-layout-header class="layout-header">
        <GlobalHeader />
      </a-layout-header>
      <div class="layout-container">
        <router-view />
      </div>
      <a-layout-footer class="layout-footer">*C* Team</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .layout-header {
  /* 盒子高度100px */
  background-color: white;
  position: absolute;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: #aaa 1px 1px 4px;
}

.layout-container {
  position: relative;
  width: 80%;
  /* 计算到页边的 margin */
  margin: calc(0.5rem + 100px) auto calc(0.5rem + 50px) auto;
  /* 计算盒子高度 */
  height: calc(100dvh - 150px - 1rem);
  /* 在盒子内进行滚动 */
  overscroll-behavior: contain;
  overflow: auto;
  box-shadow: #aaa 1px 1px 4px;
  border-radius: 16px;
  padding-bottom: 8px;
}

#basicLayout .layout-footer {
  /* 盒子高度50px */
  background-color: white;
  padding: 16px;
  position: absolute;
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 24px;
  box-shadow: #aaa 1px 1px 4px;
}
</style>
