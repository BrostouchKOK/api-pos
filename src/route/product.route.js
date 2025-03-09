const { validate_token } = require("../controller/auth.controller");
const {
  getList,
  create,
  update,
  remove,
  barcode,
} = require("../controller/product.controller");
const { uploadFile } = require("../util/helper");

module.exports = (app) => {
  // validate_token(),
  app.get("/api/product", validate_token(), getList);
  app.post(
    "/api/product",
    validate_token(),
    uploadFile.single("image-upload"),
    create
  );
  app.put("/api/product", validate_token(), update);
  app.delete("/api/product", validate_token(), remove);
  app.post("/api/new_barcode", validate_token(), barcode);
};
