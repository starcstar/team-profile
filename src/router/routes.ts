import { RouteRecordRaw } from "vue-router";
import IntroductionView from "@/views/IntroductionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: IntroductionView,
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/member",
    name: "成员展示",
    component: () =>
      import(/* webpackChunkName: "member" */ "../views/MemberView.vue"),
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/awards",
    name: "获奖展示",
    component: () =>
      import(/* webpackChunkName: "awards" */ "../views/AwardsView.vue"),
    meta: {
      hideInMenu: false,
    },
  },
];
