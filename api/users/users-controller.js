module.exports = {
  getUsers,
  getUserById,
};

const Users = require("./users-model.js");

function getUsers(req, res) {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.find(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving users",
      });
    });
}

// this middleware function will always be preceded by a call to validateID();
// validateID ensures that req.user exists, if the id in the URL is valid
function getUserById(req, res) {
  res.json(req.user);
}
