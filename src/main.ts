import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import router from "./router";
import store from "./store";
import "@arco-design/web-vue/dist/arco.css";
import "@icon-park/vue-next/styles/index.css";
import "bytemd/dist/index.css";
import "terminal.css";

const app = createApp(App);
app.use(ArcoVue).use(store).use(router).mount("#app");
