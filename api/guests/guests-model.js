const db = require("../../data/connection");

module.exports = {
  find,
  findPotlucks,
};

function find(id) {
  if (!id) {
    return db("guests");
  } else {
    return db("guests")
      .where("guest_id", id)
      .then((res) => {
        return res[0];
      });
  }
}

function findPotlucks(id) {
  //SELECT a.potluck_id, p.potluck_name FROM appointments AS a JOIN potlucks AS p ON a.potluck_id = p.potluck_id WHERE a.guest_id = 3;

  return db
    .select("a.potluck_id", "p.*")
    .from("appointments as a")
    .join("potlucks as p", function() {
      this
      .on("a.potluck_id", "=", "p.potluck_id");
    })
    .where("a.guest_id", id);
}


