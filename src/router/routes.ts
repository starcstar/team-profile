import { RouteRecordRaw } from "vue-router";
import IntroductionView from "@/views/IntroductionView.vue";
import MemberView from "@/views/MemberView.vue";
import AwardsView from "@/views/AwardsView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "团队介绍",
    component: IntroductionView,
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/member",
    name: "人员展示",
    component: MemberView,
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/awards",
    name: "获奖展示",
    component: AwardsView,
    meta: {
      hideInMenu: false,
    },
  },
];
