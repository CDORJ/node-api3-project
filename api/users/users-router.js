const express = require("express");
const router = express.Router();
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model.js");
// const Controller = require("./users-controller.js");
const MW = require("../middleware/middleware.js");

// router.use(declareHubs);

// function declareHubs(req, res, next) {
//   console.log("hubs router!!!");
//   next();
// }

// is the same as router.use((req, res, next) => {
//   console.log("hubs router!!!");
//   next();
// })

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    next({ error: error, message: `error retrieving user`, status: 500 });
  }
});

// router.get("/:id", MW.validateUserId, Controller.getUserById);
// // RETURN THE USER OBJECT
// // this needs a middleware to verify user id

router.get("/:id", MW.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post("/", MW.validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const user = await Users.insert(req.body);
    res.status(200).json(user);
  } catch (err) {
    next({ error: err, message: `error creating user(${id})`, status: 500 });
  }
});

router.put(
  "/:id",
  MW.validateUserId,
  MW.validateUser,
  async (req, res, next) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try {
      const changes = req.body;
      const { id } = req.params;
      const updatedUser = await Users.update(id, changes);
      res.status(200).json(changes);
    } catch (error) {
      next({ error: err, message: `error updating user(${id})`, status: 500 });
    }
  }
);

router.delete("/:id", MW.validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  try {
    const user = await Users.remove(id);
    res.status(200).json(user);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.get("/:id/posts", MW.validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  try {
    const post = await Users.getUserPosts(id);
    res.status(200).json(post);
  } catch (error) {
    next({ error: err, message: err.message, status: 500 });
  }
});

router.post(
  "/:id/posts",
  MW.validatePost,
  MW.validateUserId,
  async (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try {
      const post = await Posts.insert({
        text: req.body.text,
        user_id: req.user.id,
      });
      res.status(200).json(post);
    } catch (err) {
      next({ error: err, message: `error creating post(${id})`, status: 500 });
    }
  }
);

// do not forget to export the router

// async function validateId(req, res, next) {
//   const { id } = req.params;
//   const user = await Users.findById(id);
//   try {
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       next({ ...Error("invalid id"), status: 404, message: "invalid id" });
//       // res.status(404).json({ message: "invalid id" });
//     }
//   } catch (err) {
//     next({ ...err, status: 500 });
//     // res.status(500).json({ message: "error processing request", error: err });
//   }
// }

// function requireBody(req, res, next) {
//   if (req.body && Object.keys(req.body).length > 0) {
//     next();
//   } else {
//     res.status(400).json({ message: "body is required" });
//   }
// }

module.exports = router;
