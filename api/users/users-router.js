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

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

// do not forget to export the router
module.exports = router;
