const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    const [category] = await db.query("SELECT id, name, description FROM category");
    const [role] = await db.query("SELECT id, name, code FROM role");
    const [supplier] = await db.query("SELECT id, name, code FROM supplier");
    const purchase_status = [
      {
        label : "Pending",
        value : "Pending"
      },
      {
        label : "Approved",
        value : "Approved"
      },
      {
        label : "Arrived",
        value : "Arrived"
      },
    ]
    res.json({
      category,
      role,
      supplier,
      purchase_status,
    });
  } catch (error) {
    logError("config.getList", error, res);
  }
};

