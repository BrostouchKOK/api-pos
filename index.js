const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json()); // allow app can work with json data
app.use(express.urlencoded({extended:false})); // convert and pass data from api
app.use(cors({origin: "*"})); // allow all client side request


app.get("/api/home",(req,res)=>{
    const data = [
        {
            title : "Customer",
            obj : {
                total : 100,
                total_m : 50,
                total_f : 50,
            }
        },
        {
            title : "Sale",
            obj : {
                total : 100,
                due : 50,
            }
        },
        {
            title : "Exspense",
            obj : {
                total : 100,
            }
        },
        {
            title : "Category",
            obj : {
                total : 100,
            }
        }
    ];
    res.json({
        list: data,
    })
})

require("./src/route/category.route")(app);
require("./src/route/auth.route")(app);
require("./src/route/role.route")(app);
require("./src/route/supplier.route")(app);
require("./src/route/config.route")(app);
require("./src/route/product.route")(app);

const port = 8081;
app.listen(port,()=>{
    console.log("http://localhost:"+port);
})
