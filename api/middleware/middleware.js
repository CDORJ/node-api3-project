const User = require("../users/users-model.js");
const Post = require("../posts/posts-model.js");

function logger(req, res, next) {
  console.log(
    `Method: ${req.method}, URL: ${
      req.url
    }, Time: [${new Date().toISOString()}]`
  );
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({ message: `${id} is an invalid user id`, status: 405 });
    }
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
