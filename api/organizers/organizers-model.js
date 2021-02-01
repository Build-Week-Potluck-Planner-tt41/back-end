const db = require("../../data/connection");

module.exports = {
  find,
  findPotlucks,
}

function find(id) {
  if (!id) {
    return db("organizers");
  } else {
    return db("organizers").where("organizer_id", id).then(res => {
      return res[0];
    });
  }
}

function findPotlucks(id) {
  return db("potlucks").where("organizer_id", id);
}
