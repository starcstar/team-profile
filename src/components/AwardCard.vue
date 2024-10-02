<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";
import { IconUp, IconDown } from "@arco-design/web-vue/es/icon";

const isPicCard = ref(true);
const isShowImg = ref(true);
const handleClick = () => {
  isShowImg.value = !isShowImg.value;
};
const rewardColors = {
  first: "gold",
  second: "gray",
  third: "orange",
  others: "arcoblue",
};
const handleRewardTag = (grade) => {
  switch (grade.slice(0, 1)) {
    case "一":
    case "特":
    case "冠":
    case "金":
      return rewardColors.first;
    case "二":
    case "亚":
    case "银":
      return rewardColors.second;
    case "三":
    case "季":
    case "铜":
      return rewardColors.third;
    default:
      return rewardColors.others;
  }
};

/**
 定义组件属性类型
 名称
 奖等
 时间
 照片
 */
interface Props {
  competition: string;
  grade: string;
  time: string;
  pic: string;
}

/**
 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  competition: () => "default competition",
  grade: () => "default grade",
  time: () => "1145-1-4",
  pic: () => "default pic",
});
</script>

<template>
  <div id="award-card">
    <a-card
      hoverable
      v-if="props.pic !== '' && isPicCard"
      :style="{ width: '80%', borderRadius: '8px', margin: 'auto' }"
    >
      <template #cover>
        <div
          :style="{
            minHeight: '5rem',
          }"
          v-if="isShowImg"
        >
          <a-image
            :style="{
              maxHeight: '15rem',
              objectFit: 'contain',
            }"
            alt="图片失踪了"
            :src="props.pic"
          />
        </div>
      </template>
      <a-card-meta>
        <template #description>
          <div class="competition">
            {{ props.competition }}
          </div>
          <a-tag :color="handleRewardTag(props.grade)">{{ props.grade }}</a-tag>
        </template>
      </a-card-meta>
      <template #actions>
        <div v-if="isPicCard && isShowImg">
          <IconUp class="icon-hover" @click="handleClick" />
        </div>
        <div v-else>
          <IconDown class="icon-hover" @click="handleClick" />
        </div>
      </template>
    </a-card>
    <a-card
      hoverable
      :style="{ width: '80%', borderRadius: '8px', margin: 'auto' }"
      v-else
    >
      <div class="competition">
        {{ props.competition }}
      </div>
      <a-tag :color="handleRewardTag(props.grade)">{{ props.grade }}</a-tag>
    </a-card>
  </div>
</template>

<style scoped>
.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: all 0.1s;
}

.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
#award-card {
  width: 100%;
}

.competition {
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
</style>
