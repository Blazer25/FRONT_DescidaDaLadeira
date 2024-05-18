import { createApp } from "vue";
import router from "./router";

import "../public/assets/styles/reset.scss";
import "../public/assets/styles/global.scss";

import common from "./common";

import App from "./App.vue";

createApp(App).use(common).use(router).mount("#app");
