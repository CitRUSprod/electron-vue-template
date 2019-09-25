import Vue from "vue"

import router from "./router"
import store from "./store"
import vuetify from "./vuetify"
import App from "./App.vue"


Vue.config.productionTip = false


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    mounted() {
        this.$router.push("/").catch(() => {})
    }
}).$mount("#app")
