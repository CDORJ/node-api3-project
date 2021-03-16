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
    next({ error: err, message: err.message, status: 500 });
  }
}

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  insertUser: insertUser,
};
