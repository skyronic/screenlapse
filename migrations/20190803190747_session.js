
exports.up = function(knex) {
    return knex.schema.createTable('sessions', function (table) {
        table.increments();
        table.integer('interval').defaultTo(5);
        table.integer('status').defaultTo(0);
        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sessions');
};
