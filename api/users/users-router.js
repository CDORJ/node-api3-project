const express = require("express");
const Users = require("./users-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const specificUser = await Users.getById(id);
    // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const posts = await Posts.getById(id);
    res.status(200).json(posts);
  } catch (error) {}
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
