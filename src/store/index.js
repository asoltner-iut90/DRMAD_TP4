import Vue from 'vue'
import Vuex from 'vuex'
import bank from "@/store/bank";
import shop from "@/store/shop";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bank,
    shop,
  },
})
