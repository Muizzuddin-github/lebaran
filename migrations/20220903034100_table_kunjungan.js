/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("kunjungan",function(table){
    table.increments('id')
    table.string('nama',100).notNullable()
    table.string('alamat',100).notNullable()
    table.string('noHP',20).notNullable()
    table.string('tanggal',20)
    table.integer('id_status').notNullable().unsigned()

    table.foreign('id_status').references('id').inTable('status').onUpdate('CASCADE').onDelete("CASCADE")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropSchema('kunjungan')
};
