const Users = require("../users/users-model");
const morgan = require("morgan");

const logger = (req, res, next) => {
  // DO YOUR MAGIC
  morgan(":method :url :status :res[content-length] - :response-time ms");
  next();
};

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  console.log("This is the ID --->", id);
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
};

const validatePost = async (req, res, next) => {
  // DO YOUR MAGIC
};

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
