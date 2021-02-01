exports.seed = function(knex) {
  return knex('appointments').truncate()
    .then(function () {
      return knex('appointments').insert([
        { potluck_id: 1, guest_id: 1, food_brought: "salmon dish" },
        { potluck_id: 1, guest_id: 2, food_brought: "chips" },
        { potluck_id: 1, guest_id: 3, food_brought: "tuna" },
        { potluck_id: 2, guest_id: 1, food_brought: "halva" },
        { potluck_id: 2, guest_id: 2, food_brought: "tripe" },
        { potluck_id: 2, guest_id: 3, food_brought: "chips" },
        { potluck_id: 3, guest_id: 1, food_brought: "beans" },
        { potluck_id: 3, guest_id: 2, food_brought: "salad" },
      ]);
    });
};
