const config = require("../util/config");
const { db } = require("../util/helper");
const { logError } = require("../util/logError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register function
const register = async (req, res) => {
  try {
    let password = req.body.password;
    password = bcrypt.hashSync(password, 10);
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
    let data = await db.query(sql, param);
    res.json({
      data: data,
      message: "Create new account successfully...!",
    });
  } catch (error) {
    logError("auth.register", error, res);
  }
};

// Login Function
const login = async (req, res) => {
  try {
    // let sql = "SELECT * FROM user WHERE username = :username";
    let sql = "SELECT u.*, r.name AS role_name FROM user u INNER JOIN role r ON u.role_id = r.id WHERE u.username = :username";
    let param = {
      username: req.body.username,
      password: req.body.password,
    };
    let [data] = await db.query(sql, param);
    if (data.length == 0) {
      res.json({
        error: {
          username: "Username doesn't exist!",
        },
      });
    } else {
      let dbPass = data[0].password;
      let isCorrecdt = bcrypt.compareSync(param.password, dbPass); // true || false
      if (!isCorrecdt) {
        res.json({
          error: {
            password: "Incorrect password",
          },
        });
      } else {
        delete data[0].password; // to delete password when client req
        let obj = {
          profile: data[0],
          permision: ["view_all", "delete", "edit"],
        };
        res.json({
          message: "Login Successfully..!",
          ...obj,
          access_token: getAccessToken(obj),
        });
      }
    }
  } catch (error) {
    logError("auth.login", error, res);
  }
};

// Profile Function
const profile = async (req, res) => {
  try {
    res.json({
      profile: req.profile,
    });
    
  } catch (error) {
    logError("auth.profile", error, res);
  }
};

// Validate Token Function 
const validate_token = () => {
  // call in midleware in rout (role rout, user rout, auth rout)
  return (req, res, next) => {
    var authorization = req.headers.authorization; // token from client side
    var token_from_client = null;
    if (authorization != null && authorization != "") {
      token_from_client = authorization.split(" "); // authorization : "Bearer lkaht86y88@#@#@%%#$^"
      token_from_client = token_from_client[1]; // get only access token
    }
    if (token_from_client == null) {
      res.status(401).send({
        message: "Unauthorized",
      });
    } else {
      // const keyToken = "alhglajffl889*&#4";
      jwt.verify(
        token_from_client,
        config.config.token.access_token_key,
        (error, result) => {
          if (error) {
            res.status(401).send({
              message: "Unauthorized",
              error: error,
            });
          } else {
            req.current_id = result.data.profile.id;
            req.profile = result.data.profile; // write user property
            req.permision = result.data.permision;
            next();
          }
        }
      );
    }
  };
};

// getAccess Token Function
const getAccessToken = (paramData) => {
  // const keyToken = "alhglajffl889*&#4";
  const access_token = jwt.sign(
    { data: paramData },
    config.config.token.access_token_key,
    {
      expiresIn: "1d",
    }
  );
  return access_token;
};

module.exports = {
  register,
  profile,
  login,
  validate_token,
  getAccessToken,
};
