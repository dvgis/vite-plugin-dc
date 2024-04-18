import { createApp } from "vue";
import App from "./App.vue";
import * as DC from '@dvgis/dc-sdk'
import '@dvgis/dc-sdk/dist/dc.min.css'
window.DC = Object.create(DC) //Since the imported DC is read-only, it needs to be re-expanded
const app = createApp(App);
app.mount("#app");
