<template>
  <div id="banner">
    <a-carousel
      :autoPlay="true"
      animation-name="card"
      show-arrow="never"
      indicator-position="bottom"
      :style="{
        width: '90%',
        height: '250px',
      }"
    >
      <a-carousel-item v-for="image in images" :key="image">
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
          alt="banner"
        />
      </a-carousel-item>
    </a-carousel>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://asuri.club/members/logo.png",
];

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
<style scoped>
#banner {
  width: 100%;
  min-height: 20rem;
  /* background-color: brown; */
  background-color: rgb(0, 0, 0, 0);
  place-items: center;
  display: grid;
}
</style>
