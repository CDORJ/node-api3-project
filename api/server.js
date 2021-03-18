const express = require("express");
const userRouter = require("./users/users-router.js");
const postRouter = require("./posts/posts-router.js")
const helmet = require("helmet");
const mw = require("../api/middleware/middleware.js")

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(helmet(), express.json(), mw.logger );
// global middlewares and the user's router need to be connected here
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get("/motd", (req, res) => {
  const motd = process.env.MOTD || "Here is my Module 4 Project!"
  res.status(200).json(motd)
})

server.use((error, req, res, next) => {
  error.error && console.error(error.error);
  res.status(error.status).json({ message: error.message });
});

module.exports = server;
