import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import "vuestic-ui/dist/styles/reset.css"

import {createApp} from "vue"
import App from "@/App.vue"
import {router} from "@/router";
import {createPinia} from "pinia";
import { createVuestic } from "vuestic-ui";

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(createVuestic())
app.mount("#app")