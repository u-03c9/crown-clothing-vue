import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import "./firebase/init_firebase";
import { createPinia } from "pinia";
import router from "./routes";

const vm = createApp(App);
vm.use(createPinia());
vm.use(router);
vm.mount("#app");
