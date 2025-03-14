const { validate_token } = require("../controller/auth.controller");
const { getList,create,update,remove } = require("../controller/role.controller");


module.exports = (app) => {
  // validate_token(),
  app.get("/api/role",validate_token(), getList);
  app.post("/api/role", create);
  app.put("/api/role", update);
  app.delete("/api/role", remove);
};
