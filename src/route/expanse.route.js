const { validate_token } = require("../controller/auth.controller");
const {
  getList,
  create,
  update,
  remove,
  getListExpanseType,
} = require("../controller/expanse.controller");

module.exports = (app) => {
  // validate_token(),
  app.get("/api/expanse_type", validate_token(), getListExpanseType);
  app.get("/api/expanse", validate_token(), getList);
  app.post("/api/expanse", validate_token(), create);
  app.put("/api/expanse", validate_token(), update);
  app.delete("/api/expanse", validate_token(), remove);
};
