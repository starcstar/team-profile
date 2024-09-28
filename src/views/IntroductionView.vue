<script setup lang="ts">
import BannerPics from "@/components/BannerPics.vue";
</script>

<template>
  <div id="introduction-view">
    <h1 style="margin: 20px" class="my-h1">团队介绍</h1>
    <BannerPics style="width: 100%" />
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

.my-h1 {
  //text-decoration: underline;
  text-underline-color: black;
  text-underline-offset: 8px;
}

h1::before {
  border-radius: 10px;
  //background: #66666666;
  content: ">_ ";
}

h2::before {
  content: ">/ ";
}

h3::before {
  content: ">: ";
}
</style>
