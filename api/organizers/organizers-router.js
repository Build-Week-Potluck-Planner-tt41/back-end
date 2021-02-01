const express = require("express");
const { find, findPotlucks } = require("./organizers-model");
const restricted = require("../auth/restricted-middleware");
const restrictRole = require("../auth/role-restricted-middleware");

const router = express.Router();

router.get("/", restricted, restrictRole("organizer"), (req, res, next) => {
  find().then((organizers) => {
    res.status(200).json(organizers);
  }).catch(next);
});

router.get("/:id", restricted, restrictRole("organizer"), (req, res, next) => {
  const { id } = req.params;

  find(id).then((organizer) => {
    res.status(200).json(organizer);
  }).catch(next);
});

router.get("/:id/potlucks", restricted, (req, res, next) => {
  const { id } = req.params;

  findPotlucks(id).then((potlucks) => {
    res.status(200).json(potlucks);
  }).catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = router;