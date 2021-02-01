exports.up = function (knex) {
  return knex.schema
    .createTable("organizers", (table) => {
      table.increments("organizer_id");
      table.string("organizer_name", 30).unique().notNullable();
      table.string("organizer_password", 128).notNullable();
    })
    .createTable("guests", (table) => {
      table.increments("guest_id");
      table.string("guest_name", 30).unique().notNullable();
      table.string("guest_password", 128).notNullable();
    })
    .createTable("potlucks", (table) => {
      table.increments("potluck_id");
      table.string("potluck_name", 50).notNullable();
      table.string("date", 10).notNullable();
      table.string("time").notNullable();
      table.string("location", 128).notNullable();

      table
        .integer("organizer_id")
        .unsigned()
        .references("organizers.organizer_id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("appointments", (table) => {
      table.increments("appointment_id");

      table
        .integer("potluck_id")
        .unsigned()
        .references("potlucks.potluck_id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

        table
        .integer("guest_id")
        .unsigned()
        .references("guests.guest_id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

        table.boolean("confirmed").defaultTo("false");
        table.string("food_brought");
    })
    .createTable("desired_foods", (table) => {
      table.increments("food_id");

      table
        .integer("potluck_id")
        .unsigned()
        .references("potlucks.potluck_id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

        table.string("food_name", 128);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("desired_foods")
    .dropTableIfExists("appointments")
    .dropTableIfExists("potlucks")
    .dropTableIfExists("guests")
    .dropTableIfExists("organizers");
};
