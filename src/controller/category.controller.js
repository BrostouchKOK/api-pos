const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM category ORDER BY id DESC");
    res.json({
      i_know_you_are_id : req.current_id,
      list: list,
    });
  } catch (error) {
    logError("category.getList",error,res);
  }
};

exports.create = async (req, res) => {
  try{
    const sql =  "INSERT INTO category (name,description,status) VALUES (:name,:description,:status)"; // name param
    const [data] = await db.query(sql,{
      name : req.body.name,
      description : req.body.description,
      status : req.body.status,
    });
    res.json({
      data : data,
      message : "Insert Successfully!",
    })

  }catch(error){
    logError("category.create",error,res);
  }
};

exports.update = async (req, res) => {
  try{
    const sql =  "UPDATE category SET name = :name, description = :description, status = :status WHERE id = :id"; // name param
    const [data] = await db.query(sql,{
      id : req.body.id,
      name : req.body.name,
      description : req.body.description,
      status : req.body.status,
    });
    res.json({
      data : data,
      message : "Update successfully!!!",
    })

  }catch(error){
    logError("category.update",error,res);
  }
};

exports.remove = async (req, res) => {
  try{
    const sql =  "DELETE FROM category WHERE id = :id"; // name param
    const [data] = await db.query(sql,{
      id : req.body.id
    });
    res.json({
      data : data,
      message : "Delete successfully!!!",
    })

  }catch(error){
    logError("category.remove",error,res);
  }
};
