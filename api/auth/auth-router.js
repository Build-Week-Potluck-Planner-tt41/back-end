const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { jwtSecret } = require("../../config/secrets");
const { findByName, addOrganizer, addGuest, login } = require("./auth-model");

router.post("/sign-up", (req, res, next) => {
  const user = req.body;

  if (!user.name || !user.password) {
    res.status(400).json({ message: "New user requires name and password." });
  }

  if (!user.role && user.role !== "guest" && user.role !== "organizer") {
    res.status(400).json({ message: "New user requires valid role." });
  }

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (user.role === "organizer") {
    addOrganizer(user)
      .then((newOrganizer) => {
        res.status(201).json(newOrganizer);
      })
      .catch(next);
  } else {
    addGuest(user)
      .then((newGuest) => {
        res.status(201).json(newGuest);
      })
      .catch(next);
  }
});

router.post("/login", (req, res, next) => {
  const user = req.body;

  if (!user.name || !user.password) {
    res.status(400).json({ message: "Log in requires name and password." });
  }

  if (!user.role !== "guest" && user.role !== "organizer") {
    res.status(400).json({ message: "Log in requires valid role." });
  }

  findByName(user.name, user.role).then((allegedUser) => {
    if(allegedUser && bcrypt.compareSync(user.password, allegedUser.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: "Login successful", token});
    }  else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }).catch(next)
  
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: "1h",
  }

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
