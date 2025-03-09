const connection = require("./connection");
const { logError } = require("./logError");
const multer = require("multer");
const fs = require("fs/promises");
const {config} = require("./config");

exports.db = connection;
exports.logError = logError;

// Function for upload file
exports.uploadFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      // image path
      callback(null, config.image_path);

      // C:\xampp\htdocs\POS_Phone_Shop_Images
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now();
      +"-" + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  limits: {
    fieldSize: 1024 * 1024 * 3, // max 3MB
  },
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype != "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      // not allow
      callback(null, false);
    } else {
      // allow
      callback(null, true);
    }
  },
});

// function for removeFile
exports.removeFile = async (fileName)=>{
    var filePath = config.image_path;
    try{
        await fs.unlink(filePath + fileName);
        return "File Delete Successfully";
    }catch(err){
        console.error("Error Deleting File",err)
        throw err
    }
}
