const Users = require("../users/users-model.js");
const Posts = require("../posts/posts-model.js");

function logger(req, res, next) {
  // DO YOUR MAGIC
  //   logger logs to the console the following information about each request: request method, request url, and a timestamp
  // this middleware runs on every request made to the API
  console.log(`
  METHOD: ${req.method},
  URL: ${req.url}, 
  TIME: [${new Date().toISOString()}]
  `);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  // this middleware will be used for all user endpoints that include an id parameter in the url (ex: /api/users/:id and it should check the database to make sure there is a user with that id.
  //   if the id parameter is valid, store the user object as req.user and allow the request to continue
  //   if the id parameter does not match any user id in the database, respond with status 404 and { message: "user not found" }
  const { id } = req.params;
  const user = await Users.getById(id);
  try {
    if (user) {
      req.user = user;
      next();
    } else {
      next({
        message: `user(${id}) not found`,
        status: 404,
      });
    }
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  //   validateUser validates the body on a request to create or update a user
  // if the request body is missing, respond with status 400 and { message: "missing user data" }
  // if the request body lacks the required name field, respond with status 400 and { message: "missing required name field" }
  if (req.body && Object.keys(req.body).length === 0) {
    next({ message: "missing user data", status: 400 });
  } else if (!req.body.name) {
    next({ message: "missing required name field", status: 400 });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  //   validatePost validates the body on a request to create a new post
  // if the request body is missing, respond with status 400 and { message: "missing post data" }
  // if the request body lacks the required text field, respond with status 400 and { message: "missing required text field" }
  if (Object.keys(req.body).length == 0) {
    next({ message: "missing post data", status: 400 });
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
