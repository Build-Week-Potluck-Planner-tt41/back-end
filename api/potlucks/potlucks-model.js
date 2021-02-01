const db = require("../../data/connection");

module.exports = {
  find,
  findConfirmed,
  findUnconfirmed,
  findDesiredFoods,
  findConfirmedFoods,
  confirm,
  addDesiredFood,
  addConfirmedFood,
};

function find(id) {
  if (!id) {
    return db("potlucks");
  } else {
    return db("potlucks")
      .where("potluck_id", id)
      .then((res) => {
        return res[0];
      });
  }
}

function findConfirmed(id) {
  /*
  SELECT a.potluck_id, a.guest_id, g.guest_name
  FROM appointments AS a
  JOIN guests AS g ON g.guest_id = a.guest_id
  WHERE a.potluck_id = 1; 
  */
  return db
    .select("a.guest_id", "g.guest_name")
    .from("appointments as a")
    .join("guests as g", function () {
      this.on("g.guest_id", "=", "a.guest_id");
    })
    .where("a.potluck_id", id)
    .andWhere("a.confirmed", true);
}

function findUnconfirmed(id) {
  return db
    .select("a.guest_id", "g.guest_name")
    .from("appointments as a")
    .join("guests as g", function () {
      this.on("g.guest_id", "=", "a.guest_id");
    })
    .where("a.potluck_id", id)
    .andWhere("a.confirmed", false);
}

function findDesiredFoods(id) {
  //SELECT food_name FROM desired_foods WHERE potluck_id = 1;
  return db.select("food_name").from("desired_foods").where("potluck_id", id);
}

function findConfirmedFoods(id) {
  /*
  SELECT guest_id, food_brought AS food_name FROM appointments WHERE confirmed = 1 AND potluck_id = 1;
  */

  return db
    .select("guest_id", "food_brought as food_name")
    .from("appointments")
    .where("confirmed", true)
    .andWhere("potluck_id", id);
}

function confirm(id, guest_id) {
  //UPDATE appointments SET confirmed = 1 WHERE potluck_id = 1 AND guest_id = 2;

  return db("appointments").update("confirmed", true).where("potluck_id", id).andWhere("guest_id", guest_id).then(() => {
    return findConfirmed(id);
  });
}

function addDesiredFood(id, food) {
  //INSERT INTO desired_foods ("potluck_id", "food_name") VALUES (2, "pasta");

  return db("desired_foods").insert({"potluck_id": id, "food_name": food}).then(() => {
    return findDesiredFoods(id);
  })
}

function addConfirmedFood(id, guest_id, food) {
  //INSERT INTO appointments ("potluck_id", "guest_id", "food_brought") VALUES (3, 2, "salsa");
  
  return db("appointments").insert({"potluck_id": id, "guest_id": guest_id, "confirmed": true, "food_brought": food}).then(() => {
    return findConfirmedFoods(id);
  })
}
