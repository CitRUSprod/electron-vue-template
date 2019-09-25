import Vue from "vue"
import Vuetify from "vuetify"
import colors from "vuetify/lib/util/colors"
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
    },
    theme: {
        dark: false,
        themes: {
            light: {
                primary: colors.amber.darken2,
                secondary: colors.amber.lighten2
            },
            dark: {
                primary: colors.teal.darken3,
                secondary: colors.teal.base
            }
        }
    }
})
