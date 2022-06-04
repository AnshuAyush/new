const express = require("express");
require("./db/database")
const app = express();
const admin = require("./class/adminclass")
const PORT = 80;
const bodyParser = require("body-parser");
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded());

app.get("/", (req, res) =>{
    res.render("entrypoint")
})


app.get("/adminlogin", (req, res)=>{
    res.render("admin_login")
})

app.post("/adminlogin", async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password
    const obj = await admin.findOne({name:email});
    if(obj == null){
        res.send("Not Auth")
    }
    else if(email == obj.name && password == obj.password){
        res.send("You are the admin")
    }
})

app.listen(PORT, (req, res)=>{
    console.log(`The app is running on ${PORT} port`);  
})