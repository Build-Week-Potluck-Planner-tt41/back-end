exports.seed = function (knex) {
  return knex("potlucks")
    .truncate()
    .then(function () {
      return knex("potlucks").insert([
        {
          potluck_name: "foo",
          organizer_id: 1,
          date: "2021-09-23",
          time: "6:00",
          location: "bar",
        },
        {
          potluck_name: "baz",
          organizer_id: 2,
          date: "2021-05-25",
          time: "8 am",
          location: "zeb",
        },
        {
          potluck_name: "toz",
          organizer_id: 1,
          date: "2021-02-01",
          time: "2300",
          location: "ruf",
        },
      ]);
    });
};
