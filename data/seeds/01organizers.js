exports.seed = function(knex) {
  return knex('organizers').truncate()
    .then(function () {
      return knex('organizers').insert([
        { organizer_name: "saorse", organizer_password: "1234" },
        { organizer_name: "siobán", organizer_password: "1234" },
        { organizer_name: "yossi", organizer_password: "1234" }
      ]);
    });
};
