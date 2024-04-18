import { createApp } from "vue";
import App from "./App.vue";
import cesiumVue from "./cesiumVue";

const app = createApp(App);
app.use(cesiumVue);

app.mount("#app");
