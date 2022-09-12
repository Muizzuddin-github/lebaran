/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('status',function(table){
        table.increments('id')
        table.string('status')
        table.integer('id_users').notNullable().unsigned()

        table.foreign('id_users').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropSchema('status')
};
