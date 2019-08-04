import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { sessionModule } from "./session";

export default new Vuex.Store({
  strict: true,
  modules: {
    session: sessionModule,
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {}
});
