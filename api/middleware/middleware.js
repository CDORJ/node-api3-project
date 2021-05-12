const Users = require("../users/users-model");

const logger = (req, res, next) => {
  // DO YOUR MAGIC
  console.log(
    `Method: ${req.method} --- URL: ${
      req.url
    } --- Time: [${new Date().toLocaleString()}]`
  );
  next();
};

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const user = await Users.getById(id);

  if (!user) {
    res.status(404).json({ message: "user not found" });
  } else {
    req.user = user;
    next();
  }
};

const validateUser = async (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
};

const validatePost = async (req, res, next) => {
  console.log("This is the req.body ---> ", req.body);
  // DO YOUR MAGIC
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
};

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
