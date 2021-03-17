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
      next({ message: `${id} is not a valid user id`, status: 404 });
    }
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}
// REVIEW This isn't hitting the 404 error that I want it to hit
function validateUser(req, res, next) {
  if (!req.body) {
    next({ message: "missing user data!", status: 400 });
  } else if (!req.body.name) {
    next({ message: "missing required name field", status: 400 });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    next({ message: "missing user data", status: 404 });
  } else if (!req.body.text) {
    next({ message: "missing required text field", status: 400 });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
