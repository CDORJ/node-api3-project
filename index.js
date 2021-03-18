// require your server and launch it
require("dotenv").config();
const server = require("./api/server.js");

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
