import Vue from "vue";
import App from "components/App.vue";

// Setup vue
Vue.config.productionTip = false;

// start the application
new Vue({
  // store,
  render: h => h(App)
}).$mount("#app");
