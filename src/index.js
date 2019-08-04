import Vue from "vue";
import App from "components/App.vue";
import { initializeDatabase, db } from "lib/storage"

// Setup vue
Vue.config.productionTip = false;


initializeDatabase()
  .then(() => {
    new Vue({
      // store,
      render: h => h(App)
    }).$mount("#app");
  })

