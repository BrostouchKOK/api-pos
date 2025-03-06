const { register, profile, login, validate_token, getList } = require("../controller/auth.controller");

module.exports = (app) => {
  app.get("/api/auth/get-list",validate_token(), getList);
  app.post("/api/auth/register",validate_token(), register);
  app.post("/api/auth/login",validate_token(), login);
  app.post("/api/auth/profile",validate_token(), profile);
  
};
