const { db, logError } = require("../util/helper");

exports.getListExpanseType = async (req, res) => {
  try {
    var sql = "SELECT * FROM expense_type";
    const [list] = await db.query(sql);

    res.json({
      list: list,
    });
  } catch (error) {
    logError("expense_type.getListExpanseType", error, res);
  }
};

exports.getList = async (req, res) => {
  try {
    var txtSearch = req.query.txtSearch || ""; // Ensure txtSearch is defined
    var sql = `SELECT  
    exp.*,
    expt.name AS expanse_type_name
    FROM expense exp
    INNER JOIN expense_type expt
    ON exp.expense_type_id = expt.id

    `;

    // Add a space before WHERE and handle potential SQL injection
    if (txtSearch !== "") {
      sql += " WHERE ref_no LIKE :txtSearch";
    }

    // Use proper query parameter handling
    const [list] = await db.query(sql, {
      txtSearch: `%${txtSearch}%`, // Add wildcards for LIKE query
    });

    res.json({
      list: list,
    });
  } catch (error) {
    logError("expense.getList", error, res);
  }
};

exports.create = async (req, res) => {
  try {
    const sql =
      "INSERT INTO expense (name,tel,email,address,type,create_by) VALUES (:name,:tel,:email,:address,:type,:create_by)"; // name param
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
    logError("expense.create", error, res);
  }
};

exports.update = async (req, res) => {
  try {
    const sql =
      "UPDATE expense SET name = :name, tel = :tel, email = :email, address = :address, type = :type WHERE id = :id"; // name param
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
    logError("expense.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    const sql = "DELETE FROM expense WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Delete successfully!!!",
    });
  } catch (error) {
    logError("expense.remove", error, res);
  }
};
