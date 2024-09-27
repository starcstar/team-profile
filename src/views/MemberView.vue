<template>
  <h1 style="margin: 20px">成员展示</h1>
  <a-row v-if="!isSmallWidth">
    <a-col :span="12" style="height: 10rem; max-height: 200px">
      <div v-for="item in leftMem" :key="item.id">
        <MemberCard
          :avatar="item.avatar"
          :id="item.id"
          :des="item.des"
          :blogSite="item.blogSite"
          :gitHub="item.gitHub"
          :tags="item.tags"
        ></MemberCard>
      </div>
    </a-col>
    <a-col :span="12" style="height: 10rem; max-height: 200px">
      <div v-for="item in rightMem" :key="item.id">
        <MemberCard
          :avatar="item.avatar"
          :id="item.id"
          :des="item.des"
          :blogSite="item.blogSite"
          :gitHub="item.gitHub"
          :tags="item.tags"
        ></MemberCard>
      </div>
    </a-col>
  </a-row>
  <a-row v-else>
    <a-col :span="24" style="height: 10rem; max-height: 200px">
      <div v-for="item in membersInfo" :key="item.id">
        <MemberCard
          :avatar="item.avatar"
          :id="item.id"
          :des="item.des"
          :blogSite="item.blogSite"
          :gitHub="item.gitHub"
          :tags="item.tags"
        ></MemberCard>
      </div>
    </a-col>
  </a-row>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import MemberCard from "@/components/MemberCard.vue";

const membersInfo = ref([]);
const leftMem = ref([]);
const rightMem = ref([]);
const isInorder = ref(true);
const loadData = async () => {
  // 初始化
  let files = [];
  membersInfo.value = [];
  rightMem.value = [];
  leftMem.value = [];
  // 是否按照 total.json 的顺序排布
  if (!isInorder.value) {
    files = require.context("/public/members", false, /\.json$/).keys();
    for (const path of files) {
      if (path === "./total.json") {
        break;
      }
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      membersInfo.value.push(require("/public/members" + path.slice(1)));
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    files = require("/public/members/total.json")["list"];
    for (const path of files) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      membersInfo.value.push(require("/public/members/" + path));
    }
  }

  // let fileList = [];
  // await fetch("/members/total.json")
  //   .then((response) => response.json())
  //   .then((res) => {
  //     fileList = res["list"];
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  //   });
  // for (const path of fileList) {
  //   const realPath = "/members/" + path;
  //   await fetch(realPath)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       membersInfo.value.push(res);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }
  if (!isSmallWidth.value) {
    // 宽屏分左右
    let i = 0;
    for (const mem of membersInfo.value) {
      if (i % 2 === 0) {
        leftMem.value.push(mem);
      } else {
        rightMem.value.push(mem);
      }
      i += 1;
    }
  }
};
// 是否为窄屏，窄屏单列排布
const isSmallWidth = ref(false);
const getWidthAndHeight = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  isSmallWidth.value = width / height < 1.5;
};
onMounted(() => {
  window.addEventListener("resize", getWidthAndHeight);
  loadData();
  getWidthAndHeight();
});
onUnmounted(() => {
  window.removeEventListener("resize", getWidthAndHeight);
});
</script>
<style scoped></style>
