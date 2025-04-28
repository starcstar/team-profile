<script setup lang="ts">
import { IconGithub, IconLaunch } from "@arco-design/web-vue/es/icon";
import { defineProps, withDefaults, ref, onMounted, onUnmounted } from "vue";

/**
 定义组件属性类型
 */
interface Props {
  id: string;
  blogSite: string;
  gitHub: string;
  avatar: string;
  des: string;
  tags: Array<string>;
}

/**
 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  id: () => "default id",
  blogSite: () => "_blank",
  gitHub: () => "_blank",
  avatar: () => "_blank",
  des: () => "default des",
  tags: () => ["default id"],
});

const isInViewport = ref(false);
const isImageLoaded = ref(false);
const isImageError = ref(false);
const cardRef = ref<HTMLElement | null>(null);

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    isInViewport.value = true;
    // 一旦卡片进入视口，就停止观察
    if (cardRef.value) {
      observer.unobserve(cardRef.value);
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
  rootMargin: "50px",
  threshold: 0.1,
});

const toUrl = (url: string) => {
  return window.open(url, "_blank");
};

// 组件挂载后开始观察
onMounted(() => {
  if (cardRef.value) {
    observer.observe(cardRef.value);
  }
});

// 组件卸载前停止观察
onUnmounted(() => {
  if (cardRef.value) {
    observer.unobserve(cardRef.value);
  }
});
</script>

<template>
  <div id="member-card" ref="cardRef">
    <a-card
      class="infoCard"
      :style="{
        opacity: isInViewport ? 1 : 0,
        transform: isInViewport ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease-out',
      }"
    >
      <a-row class="userInfo">
        <!--头像-->
        <a-col :span="8" style="min-height: 10rem">
          <div
            style="
              align-items: center;
              justify-content: center;
              display: grid;
              margin: auto auto;
            "
          >
            <a-avatar style="height: 100%; width: 100%">
              <img
                alt="avatar"
                :src="props.avatar"
                :style="{
                  opacity: isImageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                }"
                @load="handleImageLoad"
                @error="handleImageError"
              />
              <div
                v-if="!isImageLoaded && !isImageError"
                class="avatar-placeholder"
              >
                <a-spin />
              </div>
              <div v-if="isImageError" class="avatar-error">
                <a-result status="error" title="头像加载失败" />
              </div>
            </a-avatar>
          </div>
        </a-col>
        <a-col :span="2" />
        <!--用户基础信息-->
        <a-col :span="14" style="min-height: 4rem">
          <!--用户名-->
          <a-row>
            <h2 class="nickName">{{ props.id }}</h2>
          </a-row>
          <!--分割-->
          <div style="margin: 16px 0"></div>
          <!--一句话描述-->
          <a-row class="member-description">
            <div>{{ props.des }}</div>
          </a-row>
          <!--分割-->
          <div style="margin: 16px 0"></div>
          <!--标签-->
          <a-tag
            v-for="tag in props.tags"
            :key="tag"
            color="green"
            style="margin: 10px 10px 0 0"
            >{{ tag }}
          </a-tag>
        </a-col>
      </a-row>
      <template #actions>
        <span class="icon-hover" @click="toUrl(props.gitHub)">
          <IconGithub />
        </span>

        <span class="icon-hover" @click="toUrl(props.blogSite)">
          <IconLaunch />
        </span>
      </template>
    </a-card>
  </div>
</template>

<style scoped>
.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.1s;
}

.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}

.infoCard {
  width: 80%;
  border-radius: 10px;
  box-shadow: #eeeeeeee 1px 1px 5px;
  margin: 1rem auto;
}

.userInfo {
  display: flex;
  align-items: center;
  min-height: 120px;
  overflow: auto;
}

.nickName {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 1.5rem;
  color: black;
}

.member-description {
  color: #66666666;
  width: 100%;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-fill-2);
  border-radius: 50%;
}

.avatar-error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-fill-2);
  border-radius: 50%;
  padding: 8px;
}
</style>
