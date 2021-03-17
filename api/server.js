const express = require("express");
const helmet = require("helmet");
// const morgan = require("morgan");
const usersRouter = require("./users/users-router.js");
const MW = require("../api/middleware/middleware.js");
const server = express();

// remember express by default cannot parse JSON in request bodies
// global middlewares and the user's router need to be connected here
server.use(helmet());
server.use(express.json());
server.use(MW.logger);
// server.use(morgan("dev"));

// server.use(addName);
// server.use(lockout);

server.use("/api/users", usersRouter);

server.get(
  "/",
  /*addName,*/ (req, res) => {
    res.send(`
  <h2>Lambda Users API</h2>
  <p>Welcome ${req.name ? req.name + " , " : ""}
  <p>Let's write some middleware!</p>
  `);
  }
);

// function methodLogger(req, res, next) {
//   console.log(req.method);
//   next();
// }

// function addName(req, res, next) {
//   req.name = "Cassandra";
//   next();
// }

// function lockout(req, res, next) {
//   const seconds = new Date().getSeconds();
//   if (seconds % 3 === 0) {
//     res.status(403).json({ message: "api down" });
//   } else {
//     next();
//   }
// }

// server.use((error, req, res, next) => {
//   res.status(error.status).json({ message: error.message });
// });

server.use((error, req, res, next) => {
  error.error && console.error(error.error);
  res.status(error.status).json({ message: error.message });
});

module.exports = server;
