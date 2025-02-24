const { db } = require("../util/helper");
const { logError } = require("../util/logError");
const bcrypt = require("bcrypt")

// Register function
const register = async (req, res) => {
  try {
    let password = req.body.password;
    password = bcrypt.hashSync(password,10);
    let sql =
      "INSERT INTO user (role_id,name,username,password,is_active,create_by) VALUES(:role_id,:name,:username,:password,:is_active,:create_by)";
    let param = {
      role_id: req.body.role_id,
      name: req.body.name,
      username: req.body.username,
      password: password,
      is_active: req.body.is_active,
      create_by: req.body.create_by,
    };
    let data = await db.query(sql,param);
    res.json({
        data : data,
        message : "Create new account successfully...!",
    })
  } catch (error) {
    logError("auth.register", error, res);
  }
};

// Profile Function
const profile = (req, res) => {
  try {
  } catch (error) {
    logError("auth.register", error, res);
  }
};

// Login Function
const login = (req, res) => {
  try {
  } catch (error) {
    logError("auth.register", error, res);
  }
};

module.exports = {
  register,
  profile,
  login,
};
