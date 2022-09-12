/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('users',function(table){
      table.increments('id')
      table.string('nama').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.date('created_at').notNullable().defaultTo(knex.fn.now())
      table.index('email','cari_email')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    knex.schema.dropSchema('users')
  };
  