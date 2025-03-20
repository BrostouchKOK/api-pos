const { db, logError, removeFile } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    var { txt_search, barcode, brand, category_id } = req.query;
    var sql = `
      SELECT 
      p.*,
      c.name as category_name
      FROM product p
      INNER JOIN category c
      ON p.category_id = c.id
      WHERE TRUE
    `;
    if (txt_search) {
      sql += ` AND p.name LIKE :txt_search OR barcode = :barcode`;
    }

    if (category_id) {
      sql += ` AND p.category_id = :category_id`;
    }
    if (brand) {
      sql += ` AND p.brand = :brand`;
    }
    const [list] = await db.query(sql, {
      txt_search: `%${txt_search}%`,
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
    // if (isExistBarcode(req.barcode)) {
    //   res.json({
    //     error: {
    //       barcode: "Barcode already exist",
    //     },
    //   });
    //   return false;
    // }
    // console.log(req.files)
    // res.json({
    //   body : req.body,
    //   files: req.files,
    //   message: "Insert Successfully!",
    // });
    
    var sql = `
      INSERT INTO product 
      (category_id,barcode,name,brand,description,qty,price,discount,status,image,create_by)
      VALUES 
      (:category_id,:barcode,:name,:brand,:description,:qty,:price,:discount,:status,:image,:create_by)
   `;
    const [data] = await db.query(sql, {
      ...req.body,
      image: req.files?.upload_image[0]?.filename,
      create_by: req.auth?.name,
    });
    if(req.files && req.files?.upload_image_optional){
      var paramImageProduct = [];
      req.files?.upload_image_optional?.map((item,index)=>{
        paramImageProduct.push([data?.insertId,item.filename])
      })
      // var paramImageProduct = [
      //   [1,"imagename"],
      //   [1,"imagename"],
      //   [1,"imagename"],
      // ]
      var sqlImageProduct = `INSERT INTO product_image (product_id, image) VALUES :data`;
      var [dataImage] = await db.query(sqlImageProduct,{
        data : paramImageProduct,
      });
    }
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
    // if (isExistBarcode(req.barcode)) {
    //   res.json({
    //     error: {
    //       barcode: "Barcode already exist",
    //     },
    //   });
    //   return false;
    // }
    var sql = `
      UPDATE product SET 
      category_id = :category_id,
      barcode = :barcode,
      name = :name,
      brand = :brand,
      description = :description,
      qty = :qty,
      price = :price,
      discount = :discount,
      status = :status,
      image = :image
      WHERE id = :id
    `;
    var filename = req.body.image;
    // image new
    if (req.file) {
      filename = req.file?.filename;
    }
    // image change
    if (
      req.body.image != "" &&
      req.body.image != null &&
      req.body.image != "null" &&
      req.file
    ) {
      removeFile(req.body.image); // remove old image
      filename = req.file?.filename;
    }
    // image remove
    if (req.body.image_remove == "1") {
      removeFile(req.body.image);
      filename = null;
    }
    const [data] = await db.query(sql, {
      ...req.body,
      image: filename,
      create_by: req.auth?.name,
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
    const sql = "DELETE FROM product WHERE id = :id";
    const [data] = await db.query(sql, {
      id: req.body.id,
    });
    if (
      data.affectedRowsn &&
      data.affectedRowsn != "" &&
      data.affectedRowsn != null
    ) {
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

// Gernerate new barcode function
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

isExistBarcode = async (barcode) => {
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
