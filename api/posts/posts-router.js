const express = require("express");

const router = express.Router();

const Posts = require("./posts-model");

router.get("/", async (req, res) => {
  const posts = await Posts.get();
  res.status(200).json(posts);
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;
