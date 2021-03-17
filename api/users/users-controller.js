const User = require("./users-model.js");
const Post = require("../posts/posts-model.js");
const mw = require("../middleware/middleware.js");

async function getUsers(req, res, next) {
  try {
    const user = await User.get();
    res.status(200).json(user);
  } catch (err) {
    next({ error: err, message: `error retrieving user`, status: 500 });
  }
}

const getUserById = [
  mw.validateUserId,
  (req, res) => {
    res.json(req.user);
  },
];

async function insertUser(req, res, next) {
  try {
    const user = await User.insert(req.body);
    res.status(200).json(user);
  } catch (err) {
    next({ error: err, message: `error retrieving user`, status: 500 });
  }
}

async function updateUser(req, res, next) {
  try {
    const changes = req.body;
    const { id } = req.params;
    const updatedUser = await User.update(id, changes);
    req.status(200).json(updatedUser);
  } catch (err) {
    next({ error: err, message: `error retrieving user`, status: 500 });
  }
}

async function getUsersPost(req, res, next) {
  const { id } = req.params;
  try {
    const post = await User.getUserPosts(id);
    console.log("this is post", post);
    res.status(200).json(post);
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  insertUser: insertUser,
  updateUser: updateUser,
  getUsersPost: getUsersPost,
};
