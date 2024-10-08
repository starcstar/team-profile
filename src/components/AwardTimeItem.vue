<script setup lang="ts">
import moment from "moment/moment";
import AwardCard from "@/components/AwardCard.vue";
import { defineProps, withDefaults } from "vue";

const rewardIcons = {
  first: require("@/assets/awardIcons/first.svg"),
  second: require("@/assets/awardIcons/second.svg"),
  third: require("@/assets/awardIcons/third.svg"),
  others: require("@/assets/awardIcons/others.svg"),
};
const handleReward = (grade) => {
  switch (grade.slice(0, 1)) {
    case "一":
    case "特":
    case "冠":
    case "金":
      return rewardIcons.first;
    case "二":
    case "亚":
    case "银":
      return rewardIcons.second;
    case "三":
    case "季":
    case "铜":
      return rewardIcons.third;
    default:
      return rewardIcons.others;
  }
};
const rewardColors = {
  first: "gold",
  second: "silver",
  third: "orange",
  others: "#87ceeb",
};
const handleRewardColor = (grade) => {
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
  id: number;
  competition: string;
  grade: string;
  time: string;
  pic?: string;
}

/**
 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  id: () => 1,
  competition: () => "default competition",
  grade: () => "default grade",
  time: () => "YYYY-MM-DD",
  pic: () => "default pic",
});
</script>

<template>
  <a-timeline-item
    :label="moment(props.time).format(`YYYY-MM`)"
    :key="props.id"
  >
    <template #dot>
      <img
        :src="handleReward(props.grade)"
        class="award-dot"
        :style="{
          backgroundColor: handleRewardColor(props.grade),
        }"
      />
    </template>
    <AwardCard
      :competition="props.competition"
      :grade="props.grade"
      :pic="props.pic === 'default pic' ? '' : props.pic"
      :time="props.time"
    />
  </a-timeline-item>
</template>

<style scoped>
.award-dot {
  width: 24px !important;
  height: 24px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 50%;
}
</style>
