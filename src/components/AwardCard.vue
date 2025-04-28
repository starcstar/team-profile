<script setup lang="ts">
import { defineProps, ref, withDefaults, onMounted, onUnmounted } from "vue";
import { IconUp, IconDown } from "@arco-design/web-vue/es/icon";

const isPicCard = ref(true);
const isShowImg = ref(true);
const isInViewport = ref(false);
const isImageLoaded = ref(false);
const isImageError = ref(false);
const imageRef = ref<HTMLElement | null>(null);

const handleClick = () => {
  isShowImg.value = !isShowImg.value;
};

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    isInViewport.value = true;
    if (imageRef.value) {
      observer.unobserve(imageRef.value);
    }
  }
};

const handleImageLoad = () => {
  isImageLoaded.value = true;
  isImageError.value = false;
};

const handleImageError = () => {
  isImageLoaded.value = false;
  isImageError.value = true;
};

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "200px",
  threshold: 0.1,
});

const rewardColors = {
  first: "gold",
  second: "gray",
  third: "orange",
  others: "arcoblue",
} as const;

const handleRewardTag = (grade: string): string => {
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

// 组件挂载后开始观察
onMounted(() => {
  if (imageRef.value) {
    observer.observe(imageRef.value);
  }
});

// 组件卸载前停止观察
onUnmounted(() => {
  if (imageRef.value) {
    observer.unobserve(imageRef.value);
  }
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
          ref="imageRef"
          :style="{
            minHeight: '5rem',
          }"
          v-if="isShowImg"
        >
          <a-image
            v-if="isInViewport"
            :style="{
              maxHeight: '15rem',
              objectFit: 'contain',
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }"
            alt="图片失踪了"
            :src="props.pic"
            @load="handleImageLoad"
            @error="handleImageError"
          />
          <div
            v-if="!isImageLoaded && !isImageError && isInViewport"
            class="image-placeholder"
          >
            <a-spin />
          </div>
          <div v-if="isImageError && isInViewport" class="image-error">
            <a-result status="error" title="图片加载失败" />
          </div>
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

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;
  background-color: var(--color-fill-2);
  border-radius: 4px;
}

.image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;
  background-color: var(--color-fill-2);
  border-radius: 4px;
  padding: 16px;
}
</style>
