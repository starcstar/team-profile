<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 全局样式 */
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.arco-timeline-item-dot-wrapper .arco-timeline-item-dot-content {
  position: relative;
  width: 24px !important;
  height: 24px !important;
  line-height: 24px;
}

.arco-timeline-item-dot-custom {
  position: absolute;
  display: inline-flex;
  box-sizing: border-box;
  top: 0 !important;
  left: 0 !important;
  transform: translateX(-50%) translateY(-50%);
  transform-origin: center;
}

.arco-timeline-item-dot-line {
  position: absolute;
  top: 16px !important;
  bottom: 14px !important;
  left: 0 !important;
  box-sizing: border-box;
  width: 2px !important;
  border-left-width: 2px !important;
  transform: translateX(-50%);
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layout/BasicLayout.vue";
</script>
