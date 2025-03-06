const { register, profile, login, validate_token, getList } = require("../controller/auth.controller");

module.exports = (app) => {
  app.get("/api/auth/get-list",validate_token(), getList);
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.post("/api/auth/profile",validate_token(), profile);
  
};
