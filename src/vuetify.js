import Vue from "vue"
import Vuetify from "vuetify"
import en from "vuetify/es5/locale/en"

import "vuetify/dist/vuetify.min.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"


Vue.use(Vuetify)


export default new Vuetify({
    lang: {
        locales: { en },
        current: "en"
    },
    icons: {
        iconfont: "md"
    }
})
