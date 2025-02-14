
const { db } = require("../util/helper")

exports.getList = async (req,res) =>{
    const [list] = await db.query("SELECT * FROM category");
    res.json({
        list : list,
    });
}

exports.create = (req,res) => {
    res.json({
        data : [2],
    })
}

exports.update = (req,res) => {
    res.json({
        data : [3],
    })
}

exports.remove = (req,res) => {
    res.json({
        data : [4],
    })
}