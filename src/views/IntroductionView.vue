<script setup lang="ts"></script>

<template>
  <div id="introduction-view">
    <h1 style="margin: 20px">团队介绍</h1>
    <div class="container">
      <a-space>
        <h2>General Intro</h2>
      </a-space>
      <a-divider :size="2" style="border-bottom-style: dotted" />
      <a-row class="self-intro">
        <a-col :span="8">
          <div>ACM Image</div>
        </a-col>
        <a-col :span="16">
          <div>ACM Intro</div>
        </a-col>
      </a-row>
      <a-divider :size="2" style="border-bottom-style: dotted" />
      <a-row class="self-intro">
        <a-col :span="8">
          <div>CTF Image</div>
        </a-col>
        <a-col :span="16">
          <div>CTF Intro</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
#introduction-view {
}

.container {
  padding: 20px;
}
</style>
