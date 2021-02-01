exports.seed = function(knex) {
  return knex('guests').truncate()
    .then(function () {
      return knex('guests').insert([
        { guest_name: "yael", guest_password: "1234" },
        { guest_name: "seamus", guest_password: "1234" },
        { guest_name: "agnes", guest_password: "1234" }
      ]);
    });
};
