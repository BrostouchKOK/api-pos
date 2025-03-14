const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    var txtSearch = req.query.txtSearch || ""; // Ensure txtSearch is defined
    var sql = "SELECT * FROM customer";

    // Add a space before WHERE and handle potential SQL injection
    if (txtSearch !== "") {
      sql +=
        " WHERE name LIKE :txtSearch OR tel LIKE :txtSearch OR email LIKE :txtSearch";
    }

    // Use proper query parameter handling
    const [list] = await db.query(sql, {
      txtSearch: `%${txtSearch}%`, // Add wildcards for LIKE query
    });

    res.json({
      list: list,
    });
  } catch (error) {
    logError("customer.getList", error, res);
  }
};

exports.create = async (req, res) => {
  try {
    const sql =
      "INSERT INTO customer (name,tel,email,address,type,create_by) VALUES (:name,:tel,:email,:address,:type,:create_by)"; // name param
    const [data] = await db.query(sql, {
      name: req.body.name,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address,
      type: req.body.type,
      create_by: req.auth?.name,
    });
    res.json({
      data: data,
      message: "Insert Successfully!",
    });
  } catch (error) {
    logError("customer.create", error, res);
  }
};

exports.update = async (req, res) => {
  try {
    const sql =
      "UPDATE customer SET name = :name, tel = :tel, email = :email, address = :address, type = :type WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      name: req.body.name,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address,
      type: req.body.type,
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Update successfully!!!",
    });
  } catch (error) {
    logError("customer.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    const sql = "DELETE FROM customer WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Delete successfully!!!",
    });
  } catch (error) {
    logError("customer.remove", error, res);
  }
};
