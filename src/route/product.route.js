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
    uploadFile.fields([
      { name: "image_upload", maxCount: 1 },
      { name: "image_upload_optoinal", maxCount: 5 },
    ]),
    create
  );
  app.put(
    "/api/product",
    validate_token(),
    uploadFile.fields([
      { name: "image_upload", maxCount: 1 },
      { name: "image_upload_optoinal", maxCount: 5 },
    ]),
    update
  );
  app.delete("/api/product", validate_token(), remove);
  app.post("/api/new_barcode", validate_token(), barcode);
};
