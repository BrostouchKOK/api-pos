const { validate_token } = require("../controller/auth.controller");
const {
  getList,
  create,
  update,
  remove,
} = require("../controller/category.controller");

module.exports = (app) => {
  // validate_token(),
  app.get("/api/category",validate_token(), getList);
  app.post("/api/category", validate_token(),create);
  app.put("/api/category", validate_token(),update);
  app.delete("/api/category", validate_token(),remove);
};
