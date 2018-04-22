exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user', table => {
      table.increments('user_id').primary();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('photo', table => {
      table.increments('photo_id').primary(),
        table.string('author').notNullable(),
        table.string('link').notNullable(),
        table.string('description'),
        table.timestamps(true, true);
    });

  };
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('photo')
                      .dropTable('user')
  };
