const Post = require("./posts-model.js");

async function getPosts(req, res, next) {
  const post = await Post.get();
  try {
    res.status(200).json(post);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

async function updatePost(req, res, next) {
  const { id } = req.params;
  const changes = req.body;
  try {
    const post = await Post.update(id, changes);
    res.status(200).json(post);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

module.exports = {
  getPosts: getPosts,
  updatePost: updatePost,
};
