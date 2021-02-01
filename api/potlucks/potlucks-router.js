const express = require("express");
const restricted = require("../auth/restricted-middleware");
const restrictRole = require("../auth/role-restricted-middleware");

const router = express.Router();

const { find,
  findConfirmed,
  findUnconfirmed,
  findDesiredFoods,
  findConfirmedFoods,
  confirm,
  addDesiredFood,
  addConfirmedFood, } = require("./potlucks-model");


router.get("/", restricted, (req, res, next) => {
  find().then((potlucks) => {
    res.status(200).json(potlucks);
  }).catch(next)
})

router.get("/:id", restricted, (req, res, next) => {
  const { id } = req.params;

  find(id).then((potluck) => {
    res.status(200).json(potluck);
  }).catch(next)
})

router.get("/:id/guests/confirmed", restricted, (req, res, next) => {
  const { id } = req.params;

  findConfirmed(id).then((guests) => {
    res.status(200).json(guests);
  }).catch(next);
})

router.get("/:id/guests/unconfirmed", restricted, (req, res, next) => {
  const { id } = req.params;

  findUnconfirmed(id).then((guests) => {
    res.status(200).json(guests);
  }).catch(next);
})

router.get("/:id/foods/desired", restricted, (req, res, next) => {
  const { id } = req.params;

  findDesiredFoods(id).then((foods) => {
    res.status(200).json(foods);
  }).catch(next);
})

router.get("/:id/foods/confirmed", restricted, (req, res, next) => {
  const { id } = req.params;

  findConfirmedFoods(id).then((foods) => {
    res.status(200).json(foods);
  }).catch(next);
})

router.post("/:id/guests/:guest_id/confirm", restricted, (req, res, next) => {
  const { id, guest_id } = req.params;

  confirm(id, guest_id).then((guest) => {
    res.status(201).json(guest);
  }).catch(next);
})

router.post("/:id/foods/desired/add", restricted, restrictRole("organizer"), (req, res, next) => {
  const { id } = req.params;
  const food = req.body.food;
  if (!food) {
    res.status(400).json({ message: "Food must be specified"});
  } else {
    addDesiredFood(id, food).then((food) => {
      res.status(201).json(food);
    }).catch(next);
  } 
})

router.post("/:id/guests/:guest_id/foods/add", restricted, (req, res, next) => {
  const { id, guest_id } = req.params;
  const food = req.body.food;
  if (!food) {
    res.status(400).json({ message: "Food must be specified"});
  } else {
    addConfirmedFood(id, guest_id, food).then((food) => {
      res.status(201).json(food);
    }).catch(next);
  } 
})


router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = router;