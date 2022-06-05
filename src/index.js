const express = require("express");
require("./db/database")
const app = express();
const admin = require("./class/adminclass")
const PORT = 80;
const Teacher = require("./class/teach")
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
const filesarray =[]

app.use(upload());
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
let active_admin = false


app.get("/", (req, res) => {
    res.render("entrypoint")
})


app.get("/adminlogin", (req, res) => {
    res.render("admin_login")
})

app.post("/adminlogin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    const obj = await admin.findOne({ name: email });
    if (obj == null || email != obj.name || password != obj.password) {
        res.redirect("/adminlogin");
        res.render("admin_login")
        active_admin = false
        return;
    }
    else if (email == obj.name && password == obj.password) {
        active_admin = true
        res.redirect("/admin")
        res.render("/foradmin")
    }
})

app.get("/admin", (req, res) => {
    if (!active_admin) {
        res.redirect("/adminlogin");
        res.render("admin_login")
        return;
    }
    res.render("foradmin")
})

app.post("/admin", async (req, res) => {
    const obj = req.body;
    if (obj.name != undefined) {
        const doc = new Teacher(obj);
        const result = await Teacher.insertMany([doc]);
    }
    const myfile = req.files.file;
    
    if (myfile.name != undefined) {
        filesarray.push(myfile.name)
        myfile.mv("./uploaded/" + myfile.name, (err) => {
            if (err) console.log(err);
        })

    }
    res.render("foradmin")
    
})

app.get("/admin/uploadfiles", (req, res) =>{

    res.render("viewupload", {display:filesarray})
})

app.listen(PORT, (req, res) => {
    console.log(`The app is running on ${PORT} port`);
})