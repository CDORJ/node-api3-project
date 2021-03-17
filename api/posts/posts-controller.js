const Post = require("./posts-model.js");

async function getPosts(req, res, next) {
  const post = await Post.get();
  try {
    res.status(200).json(post);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

async function getPostById(req, res, next) {
  const { id } = req.params;
  try {
    const post = await Post.getById(id);
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

async function addNewPost(req, res, next) {
  try {
    const post = await Post.insert({
      text: req.body.text,
      user_id: req.user.id,
    });
    res.status(200).json(post);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

module.exports = {
  getPosts: getPosts,
  getPostById: getPostById,
  updatePost: updatePost,
  addNewPost: addNewPost,
};
