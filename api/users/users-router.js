const express = require("express");
// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

// The middleware functions also need to be required
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Sorry. Something went wrong." });
  }
});

// RETURN THE USER OBJECT
// this needs a middleware to verify user id
router.get("/:id", mw.validateUserId, async (req, res) => {
  try {
    const specificUser = req.user;
    res.status(200).json(specificUser);
  } catch (error) {
    res.status(500).json({ message: "Sorry. Something went wrong." });
  }
});

router.post("/", async (req, res) => {
  const newUserInfo = req.body;

  try {
    const newUser = await Users.insert(newUserInfo);
    // RETURN THE NEWLY CREATED USER OBJECT
    // this needs a middleware to check that the request body is valid
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Sorry. Something went wrong." });
  }
});

router.put("/:id", mw.validateUserId, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const confirmation = await Users.update(id, changes);

    if (confirmation) {
      const updatedUser = await Users.getById(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Sorry. Something went wrong." });
  }
});

router.delete("/:id", mw.validateUserId, async (req, res) => {
  const { id } = req.params;
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const deletedUser = await Users.getById(id);
    const confirmation = await Users.remove(id);
    if (confirmation) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Sorry. Something went wrong." });
  }
});

router.get("/:id/posts", mw.validateUserId, async (req, res) => {
  const { id } = req.params;
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const posts = await Users.getUserPosts(id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Sorry. Something went wrong." });
  }
});

router.post("/:id/posts", mw.validateUserId, async (req, res) => {
  const userId = req.params.id;
  const newPostInfo = { ...req.body, user_id: userId };
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const newPost = await Posts.insert(newPostInfo);
    if (newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sorry. Something went wrong.", error });
  }
});

// do not forget to export the router
module.exports = router;
