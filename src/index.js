import Vue from "vue";
import App from "components/App.vue";
import { initializeDatabase, db, loadExisting } from "lib/storage"
import store from 'store'
import {initScreenshotManager} from "lib/screenshot_manager";

// Setup vue
Vue.config.productionTip = false;


(async function() {
  await initializeDatabase();
  await loadExisting();
  await initScreenshotManager();


  new Vue({
    store,
    render: h => h(App)
  }).$mount("#app");
})();


