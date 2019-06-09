import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"

import router from "./router"
import store from "./store"
import App from "./App.vue"

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        this.$router.push("/")
    }
}).$mount("#app")
