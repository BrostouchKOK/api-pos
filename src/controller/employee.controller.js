const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    var txtSearch = req.query.txtSearch || ""; // Ensure txtSearch is defined
    var sql =
      "SELECT * FROM employee WHERE firstname LIKE ? OR lastname LIKE ? OR tel LIKE ? OR email LIKE ?";

    const searchValue = `%${txtSearch}%`; // Add wildcards for LIKE query
    const [list] = await db.query(sql, [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
    ]);

    res.json({
      list: list,
    });
  } catch (error) {
    logError("employee.getList", error, res);
  }
};

exports.create = async (req, res) => {
  try {
    const sql =
      "INSERT INTO employee (firstname,lastname,gender,tel,email,address,position,create_by) VALUES (:firstname,:lastname,:gender,:tel,:email,:address,:position,:create_by)"; // name param
    const [data] = await db.query(sql, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address,
      position: req.body.position,
      create_by: req.auth?.name,
    });
    res.json({
      data: data,
      message: "Insert Successfully!",
    });
  } catch (error) {
    logError("employee.create", error, res);
  }
};

exports.update = async (req, res) => {
  try {
    const sql =
      "UPDATE employee SET firstname = :firstname,lastname = :lastname,gender = :gender, tel = :tel, email = :email, address = :address, position = :position WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address,
      position: req.body.position,
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Update successfully!!!",
    });
  } catch (error) {
    logError("employee.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    const sql = "DELETE FROM employee WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      id: req.body.id,
    });
    res.json({
      data: data,
      message: "Delete successfully!!!",
    });
  } catch (error) {
    logError("employee.remove", error, res);
  }
};
