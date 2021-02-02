const db = require("../../data/connection");

module.exports = {
  findByName,
  addOrganizer,
  addGuest,
  login,
};

function find (id, role) {
  if(role === "organizer") {
    return db("organizers").where("organizer_id", id).then(res => {
      return res[0];
    });
  } else {
    return db("guests").where("guest_id", id).then(res => {
      return res[0];
    });
  }
}

function findByName (name, role) {
  if(role === "organizer") {
    return db.select("organizer_password as password", "organizer_name", "organizer_id").from("organizers").where("organizer_name", name).then(res => {
      return res[0];
    });
  } else {
    return db.select("guest_password as password", "guest_name", "guest_id").from("guests").where("guest_name", name).then(res => {
      return res[0];
    });
  }
}

function addOrganizer(user) {
  return db("organizers")
    .insert({ "organizer_name": user.name, "organizer_password": user.password })
    .then((res) => {
      return findByName(user.name, user.role);
    });
}

function addGuest(user) {
  return db("guests")
    .insert({
      "guest_name": user.name,
      "guest_password": user.password,
    })
    .then((res) => {
      return findByName(user.name, user.role);
    });
}

function login(user) {}
