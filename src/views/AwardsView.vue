<template>
  <div id="awards-view">
    <a-row>
      <h1 style="margin: 0 20px">获奖展示</h1>
    </a-row>
    <a-row>
      <a-col :span="3">
        <!--倒序选择框-->
        <div style="display: flex; flex-direction: column; margin: 20px">
          <a-checkbox
            :checked="!!pendingProps.reverse"
            @change="(v) => onChange({ reverse: v })"
            style="font-size: 16px"
          >
            倒序
          </a-checkbox>
        </div>
      </a-col>
      <a-col :span="17">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="ACM">
            <div class="tabs">
              <a-card :bordered="false">
                <a-timeline
                  class="timeline"
                  label-position="relative"
                  mode="alternate"
                  v-bind="pendingProps"
                >
                  <template v-if="pendingProps.hasPendingDot" #dot>
                    <IconFire :style="{ color: '#e70a0a' }" />
                  </template>
                  <AwardTimeItem
                    v-for="item of acmAwardsList"
                    :key="item.id"
                    :time="item.time"
                    :competition="item.competition"
                    :grade="item.grade"
                    :pic="item?.pic"
                  />
                </a-timeline>
              </a-card>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" title="CTF">
            <div class="tabs">
              <a-card :bordered="false">
                <a-timeline
                  class="timeline"
                  label-position="relative"
                  mode="alternate"
                  v-bind="pendingProps"
                >
                  <template v-if="pendingProps.hasPendingDot" #dot>
                    <IconFire :style="{ color: '#e70a0a' }" />
                  </template>
                  <AwardTimeItem
                    v-for="item of ctfAwardsList"
                    :key="item.id"
                    :time="item.time"
                    :competition="item.competition"
                    :grade="item.grade"
                    :pic="item?.pic"
                  />
                </a-timeline>
              </a-card>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="4">
        <div style="display: flex; flex-direction: column; margin: 20px">
          <a-link href="https://asuri.club/members/#awards">
            To Asuri
            <IconLaunch />
          </a-link>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { IconFire, IconLaunch } from "@arco-design/web-vue/es/icon";
import AwardTimeItem from "@/components/AwardTimeItem.vue";

const pendingProps = ref({
  pending: "Comming soon...",
  hasPendingDot: true,
});

const onChange = (newProps) => {
  pendingProps.value = {
    ...pendingProps.value,
    ...newProps,
  };
};
const acmAwardsList = ref([]);
const ctfAwardsList = ref([]);
const loadData = async () => {
  // 初始化
  acmAwardsList.value = [];
  ctfAwardsList.value = [];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  acmAwardsList.value = require("/public/awards/ACM.json");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ctfAwardsList.value = require("/public/awards/CTF.json");
};
onMounted(() => {
  loadData();
});
</script>
<style scoped>
#awards-view {
}

.timeline {
  padding-top: 16px;
  width: 100%;
}

.tabs {
  margin: 0 auto;
}
</style>
