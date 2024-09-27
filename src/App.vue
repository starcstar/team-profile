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

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layout/BasicLayout.vue";
</script>
