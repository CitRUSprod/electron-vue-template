import Vue from "vue"
import Vuex from "vuex"
import pathify from "vuex-pathify"

import lines from "./modules/lines"


Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules: { lines }
})
