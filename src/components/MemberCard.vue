<script setup lang="ts">
import { IconGithub, IconLaunch } from "@arco-design/web-vue/es/icon";
import { defineProps, withDefaults } from "vue";

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
const toUrl = (url: string) => {
  return window.open(url, "_blank");
};
</script>

<template>
  <div id="member-card">
    <a-card class="infoCard">
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
              <img alt="avatar" :src="props.avatar" />
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
</style>
