const { db, logError, removeFile } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    // console.log("query",req.query);
    var { txt_search, category_id, barcode, brand } = req.query;
    var sql = `
      SELECT 
      p.*,
      c.name AS category_name
      FROM product p
      INNER JOIN category c
      ON p.category_id = c.id
      WHERE TRUE
    `;
    if (txt_search) {
      sql += ` AND (p.name LIKE :txt_search OR p.barcode = :barcode)`;
    }
    if (category_id) {
      sql += ` AND p.category_id = :category_id`;
    }
    if (brand) {
      sql += ` AND p.brand = :brand`;
    }
    const [list] = await db.query(sql, {
      txt_search: "%" + txt_search + "%",
      barcode: txt_search,
      brand,
      category_id,
    });
    res.json({
      list: list,
    });
  } catch (error) {
    logError("product.getList", error, res);
  }
};

exports.create = async (req, res) => {
  try {
    const barcodeExists = await this.isExistBarcode(req.body.barcode);
    if (barcodeExists) {
      return res.json({
        error: {
          barcode: "Barcode already exists",
        },
      });
    }

    var sql =
      "INSERT INTO product (category_id,barcode,name,brand,description,qty,price,discount,status,image,create_by) VALUES (:category_id,:barcode,:name,:brand,:description,:qty,:price,:discount,:status,:image,:create_by)";

    const [data] = await db.query(sql, {
      ...req.body,
      image: req.file?.filename,
      create_by: req.auth?.name,
    });

    res.json({
      data,
      message: "Insert Successfully!",
    });
  } catch (error) {
    logError("product.create", error, res);
  }
};

exports.update = async (req, res) => {
  try {
    const sql =
      "UPDATE product SET name = :name, description = :description, status = :status WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    });
    res.json({
      data: data,
      message: "Update successfully!!!",
    });
  } catch (error) {
    logError("product.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    const sql = "DELETE FROM product WHERE id = :id"; // name param
    const [data] = await db.query(sql, {
      id: req.body.id,
    });
    if (data.affectedRows && req.body.image != "" && req.body.image != null) {
      removeFile(req.body.image);
    }
    res.json({
      data: data,
      message: "Delete successfully!!!",
    });
  } catch (error) {
    logError("product.remove", error, res);
  }
};

// Function generate new barcode
exports.barcode = async (req, res) => {
  try {
    var sql =
      "SELECT CONCAT('P',LPAD((SELECT COALESCE(MAX(id),0)+1 FROM product), 3, '0')) as barcode";
    var [data] = await db.query(sql);
    res.json({
      barcode: data[0].barcode,
      message: "request barcode successfully",
    });
  } catch (err) {
    logError("product.new-barcode", err, res);
  }
};

// function for check barcode exist or not exist
exports.isExistBarcode = async (barcode) => {
  try {
    var sql = "SELECT COUNT(id) as Total FROM product WHERE barcode=:barcode";
    var [data] = await db.query(sql, {
      barcode: barcode,
    });
    if (data.length > 0 && data[0].Total > 0) {
      return true; // barcode exist
    }
    return false; // barcode dones't exist
  } catch (err) {
    logError("isExistBarcode", err, res);
  }
};
