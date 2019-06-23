import Vue from "vue"
import Vuex from "vuex"

import lines from "./modules/lines"


Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [vp.default.plugin],
    modules: { lines }
})
