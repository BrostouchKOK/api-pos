const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM role");
    res.json({
      i_know_you_are_id : req.current_id,
      list: list,
    });
  } catch (error) {
    logError("role.getList",error,res);
  }
};

exports.create = async (req, res) => {
  // validate
  try{
    const sql =  "INSERT INTO role (name,code) VALUES (:name,:code)"; // name param
    const [data] = await db.query(sql,{
      name : req.body.name,
      code : req.body.code,
    });
    res.json({
      data : data,
      message : "Insert Successfully!",
    })

  }catch(error){
    logError("role.create",error,res);
  }
};

exports.update = async (req, res) => {
  try{
    const sql =  "UPDATE role SET name=:name, code=:code WHERE id = :id"; // name param
    const [data] = await db.query(sql,{
      id : req.body.id,
      name : req.body.name,
      code : req.body.code,
    });
    res.json({
      data : data,
      message : "Update successfully!!!",
    })

  }catch(error){
    logError("role.update",error,res);
  }
};

exports.remove = async (req, res) => {
  try{
    const sql =  "DELETE FROM role WHERE id = :id"; // name param
    const [data] = await db.query(sql,{
      id : req.body.id
    });
    res.json({
      data : data,
      message : "Delete successfully!!!",
    })

  }catch(error){
    logError("role.remove",error,res);
  }
};
