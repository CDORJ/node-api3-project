const router = require("express").Router();
const Controller = require("./users-controller.js");
const mw = require("../middleware/middleware.js");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

router.get("/", Controller.getUsers);

router.get("/:id", mw.validateUserId, Controller.getUserById);

router.post("/", mw.validateUser, Controller.insertUser);

router.put("/:id", mw.validateUserId, mw.validateUser, Controller.updateUser);

router.delete("/:id", mw.validateUserId, Controller.deleteUser);

router.get("/:id/posts", mw.validateUserId, Controller.getUsersPost);

// NOTE: the next one is completed in the post-router file.

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
