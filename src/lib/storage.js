const sqlite3 = window.require('sqlite3');
import store from 'store';

let knex = window.require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./temp/db.sqlite"
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


export const db = knex;
export const initializeDatabase = () => {
  return db.migrate.latest({
    migrationSource: new WebpackMigrationSource(require.context('../../migrations', false, /.js$/))
  })
};

export const loadExisting = async () => {
  let sessionData = await db('sessions')
    .select(['id', 'interval', 'status']);
  console.log(sessionData)

  store.dispatch('session/loadData', sessionData)
};