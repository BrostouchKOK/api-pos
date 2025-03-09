const { db, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    const [category] = await db.query(
      "SELECT id, name, description FROM category"
    );
    const [role] = await db.query("SELECT id, name, code FROM role");
    const [supplier] = await db.query("SELECT id, name, code FROM supplier");
    const purchase_status = [
      {
        label: "Pending",
        value: "Pending",
      },
      {
        label: "Approved",
        value: "Approved",
      },
      {
        label: "Shipped",
        value: "Shipped",
      },
      {
        label: "Recieved",
        value: "Recieved",
      },
      {
        label: "Issues",
        value: "Issues",
      },
    ];
    const brand = [
      { label: "Apple", value: "Apple", country: "USA" },
      { label: "Samsung", value: "Samsung", country: "South Korea" },
      { label: "Dell", value: "Dell", country: "USA" },
      { label: "HP", value: "HP", country: "USA" },
      { label: "Lenovo", value: "Lenovo", country: "China" },
      { label: "Asus", value: "Asus", country: "Taiwan" },
      { label: "Acer", value: "Acer", country: "Taiwan" },
      { label: "Microsoft", value: "Microsoft", country: "USA" },
    ];

    res.json({
      category,
      role,
      supplier,
      purchase_status,
      brand,
    });
  } catch (error) {
    logError("config.getList", error, res);
  }
};
