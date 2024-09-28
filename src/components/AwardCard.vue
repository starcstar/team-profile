<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";

const isPicCard = ref(true);
const handleClick = () => {
  isPicCard.value = !isPicCard.value;
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
      return rewardColors.first;
    case "二":
      return rewardColors.second;
    case "三":
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
  time: () => "YYYY-MM-DD",
  pic: () => "default pic",
});
</script>

<template>
  <div id="award-card" @click="handleClick">
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
        >
          <img
            :style="{
              width: '100%',
              height: '100%',
            }"
            alt="dessert"
            :src="props.pic"
          />
        </div>
      </template>
      <a-card-meta>
        <template #description>
          <div class="competition">{{ props.competition }}</div>
          <a-tag :color="handleRewardTag(props.grade)">{{ props.grade }}</a-tag>
        </template>
      </a-card-meta>
    </a-card>
    <a-card
      hoverable
      :style="{ width: '80%', borderRadius: '8px', margin: 'auto' }"
      v-else
    >
      <div class="competition">{{ props.competition }}</div>
      <a-tag :color="handleRewardTag(props.grade)">{{ props.grade }}</a-tag>
    </a-card>
  </div>
</template>

<style scoped>
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
