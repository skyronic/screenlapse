import Vue from "vue";
import App from "components/App.vue";

// Setup vue
Vue.config.productionTip = false;
const sqlite3 = window.require('sqlite3');

let knex = window.require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./foo.sqlite"
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations'
  }
});

class WebpackMigrationSource {
  constructor(migrationContext) {
    this.migrationContext = migrationContext;
  }

  getMigrations() {
    return Promise.resolve(this.migrationContext.keys().sort())
  }

  getMigrationName(migration) {
    return migration
  }

  getMigration(migration) {
    return this.migrationContext(migration)
  }
}

knex.migrate.latest({
migrationSource: new WebpackMigrationSource(require.context('../migrations', false, /.js$/))
})

knex("sessions").insert({
  interval: 42
}).then(() => {

});



// start the application
new Vue({
  // store,
  render: h => h(App)
}).$mount("#app");
