'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('books', (table) => {
        table.increments();
        table.integer('user_id').references('id').inTable('users')
    .onDelete('CASCADE').index();
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('currentlyWith').notNullable();
        table.string('ownerEmail').notNullable();
        table.boolean('available').notNullable();

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
