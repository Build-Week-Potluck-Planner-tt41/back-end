const express = require("express");
const guestRouter = require("./guests/guests-router");
const organizerRouter = require("./organizers/organizers-router");
const potluckRouter = require("./potlucks/potlucks-router");
const authRouter = require("./auth/auth-router");

const server = express();

server.use(express.json());

server.use("/api/guests", guestRouter);
server.use("/api/organizers", organizerRouter);
server.use("/api/potlucks", potluckRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" })
})

module.exports = server;