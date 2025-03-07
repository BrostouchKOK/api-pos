const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    var txtSearch = req.query.txtSearch || ""; // Ensure txtSearch is defined
    var sql = "SELECT * FROM supplier";

    // Add a space before WHERE and handle potential SQL injection
    if (txtSearch !== "") {
      sql += " WHERE name LIKE :txtSearch OR code LIKE :txtSearch";
    }

    // Use proper query parameter handling
    const [list] = await db.query(sql, {
      txtSearch: `%${txtSearch}%`, // Add wildcards for LIKE query
    });

    res.json({
      list: list,
    });
  } catch (error) {
    logError("supplier.getList", error, res);
  }
};

exports.create = async (req, res) => {
  try {
    const sql =
      "INSERT INTO supplier (name,code,tel,email,address,website,note,create_by) VALUES (:name,:code,:tel,:email,:address,:website,:note,:create_by)"; // name param
    const [data] = await db.query(sql, {
      name: req.body.name,
      code: req.body.code,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address,
      website: req.body.website,
      note: req.body.note,
      create_by: req.auth?.name,
    });
    res.json({
      data: data,
      message: "Insert Successfully!",
    });
  } catch (error) {
    logError("supplier.create", error, res);
  }
};

exports.update = async (req, res) => {
  try {
    const sql =
      "UPDATE supplier SET name = :name, code = :code, tel = :tel, email = :email,address = :address,website = :website,note = :note WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      name: req.body.name,
      code: req.body.code,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address,
      website: req.body.website,
      note: req.body.note,
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Update successfully!!!",
    });
  } catch (error) {
    logError("supplier.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    const sql = "DELETE FROM supplier WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Delete successfully!!!",
    });
  } catch (error) {
    logError("supplier.remove", error, res);
  }
};
