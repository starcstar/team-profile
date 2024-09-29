<script setup lang="ts">
import MdViewer from "@/components/MdViewer.vue";
import generalIntro from "/public/Introduction/General.md?"; // 使用 import 引入 md
import acmIntro from "/public/Introduction/ACM.md?"; // 使用 import 引入 md
import ctfIntro from "/public/Introduction/CTF.md?"; // 使用 import 引入 md
import cssTest from "/public/Introduction/CssTest.md?";
import { onMounted, onUnmounted, ref } from "vue"; // 使用 import 引入 md
const isBoarded = ref(false);
// 是否为窄屏，窄屏单列排布
const isSmallWidth = ref(false);
const getWidthAndHeight = () => {
  // 显示宽高比小于1.5或屏幕宽高比小于1.5，判定为窄屏
  isSmallWidth.value =
    window.innerWidth / window.innerHeight < 1.5 ||
    window.screen.width / window.screen.height < 1.5;
};
onMounted(() => {
  window.addEventListener("resize", getWidthAndHeight);
  getWidthAndHeight();
});
onUnmounted(() => {
  window.removeEventListener("resize", getWidthAndHeight);
});
</script>

<template>
  <div id="introduction-view">
    <h1 style="margin: 0 20px" class="my-h1">团队介绍</h1>
    <!--    <BannerPics style="width: 100%" />-->
    <div class="intro-container">
      <a-card :bordered="isBoarded">
        <MdViewer :value="generalIntro" />
      </a-card>
      <a-divider :size="2" style="border-bottom-style: dotted" />
      <a-row v-if="!isSmallWidth">
        <a-col :span="12">
          <a-card class="self-intro" :bordered="isBoarded">
            <MdViewer :value="acmIntro" />
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="self-intro" :bordered="isBoarded">
            <MdViewer :value="ctfIntro" />
          </a-card>
        </a-col>
      </a-row>
      <div v-else>
        <a-card class="self-intro" :bordered="isBoarded">
          <MdViewer :value="acmIntro" />
        </a-card>
        <a-divider :size="2" style="border-bottom-style: dotted" />
        <a-card class="self-intro" :bordered="isBoarded">
          <MdViewer :value="ctfIntro" />
        </a-card>
      </div>
      <a-card style="margin-bottom: 1rem" :bordered="true">
        <MdViewer :value="cssTest" />
      </a-card>
    </div>
  </div>
</template>

<style scoped>
#introduction-view {
}

.intro-container {
  margin: 0 20px;
}

.self-intro {
  padding: 8px;
}

.my-h1 {
  //text-decoration: underline;
  text-underline-color: black;
  text-underline-offset: 8px;
}
</style>
