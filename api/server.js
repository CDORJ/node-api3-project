const express = require("express");
const helmet = require("helmet");
const usersRouter = require("./users/users-router");
const mw = require("../api/middleware/middleware");

const server = express();

server.use(helmet("dev"));
// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use(mw.logger);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
