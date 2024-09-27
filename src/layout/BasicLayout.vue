<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <div class="container">
        <router-view />
      </div>
      <a-layout-footer class="footer">*C* Team</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  background-color: white;
  position: absolute;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: #aaa 1px 1px 4px;
}

.container {
  position: relative;
  width: 80%;
  margin: calc(0.5rem + 100px) auto calc(0.5rem + 50px);
  height: calc(100vh - 150px - 1rem);
  overscroll-behavior: contain;
  overflow: auto;
  box-shadow: #aaa 1px 1px 4px;
  border-radius: 16px;
}

#basicLayout .footer {
  background-color: white;
  padding: 16px;
  position: absolute;
  height: 18px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 24px;
  box-shadow: #aaa 1px 1px 4px;
}
</style>
