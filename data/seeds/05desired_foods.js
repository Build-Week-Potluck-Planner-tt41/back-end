exports.seed = function(knex) {
  return knex('desired_foods').truncate()
    .then(function () {
      return knex('desired_foods').insert([
        { potluck_id: 1, food_name: "chips" },
        { potluck_id: 1, food_name: "dips" },
        { potluck_id: 1, food_name: "beef" },
        { potluck_id: 2, food_name: "halva" },
        { potluck_id: 3, food_name: "salmon" },
      ]);
    });
};

