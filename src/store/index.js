import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { sessionModule } from "./session";
import {screenshotModule} from "store/screenshot";

export default new Vuex.Store({
  strict: true,
  modules: {
    session: sessionModule,
    screenshot: screenshotModule
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {}
});
