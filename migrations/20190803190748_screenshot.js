
exports.up = function(knex) {
    return knex.schema.createTable('screenshots', function (table) {
        table.increments();
        table.string('path');
        table.integer('session_id').unsigned();
        table.foreign('session_id').references('id').inTable('sessions');
        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('screenshots');
};
