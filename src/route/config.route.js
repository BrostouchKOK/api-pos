const { validate_token } = require("../controller/auth.controller");
const { getList } = require("../controller/config.controller");

module.exports = (app) => {
  // validate_token(),
  app.get("/api/config",validate_token(), getList);
};
