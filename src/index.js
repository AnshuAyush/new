const express = require("express");
require("./db/database")
const app = express();
const admin = require("./class/adminclass")
const PORT = 80;
const Teacher = require("./class/teach")
const bodyParser = require("body-parser");
const Image = require("./class/file")
const path = require("path");
const Student = require("./class/Student");
const bcrypt = require("bcryptjs");
let currentteacher = null;
const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, 'upload')
    },
    filename:(req, file, cb) =>{
        const ext = path.extname(file.originalname)
        const filepath = `images/${ext}`
        const data = req.files;
        Image.create({filepath, data}).then(()=>{cb(null, filepath)});
        cb(null, filepath); 
    }
})
const upload = multer({storage:storage});



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
        res.render("foradmin.hbs")
    }
})

app.get("/admin", (req, res) => {
    if (!active_admin) {
        res.redirect("/adminlogin");
        res.render("admin_login");
        return;
    }
    res.render("foradmin")
})

app.post("/admin", upload.array('file'), async (req, res) => {
    const obj = req.body;
    const strongPassword = await bcrypt.hash(obj.password, 12);
    obj.password = strongPassword
    if (obj.name != undefined) {
        const doc = new Teacher(obj);
        const result = await Teacher.insertMany([doc]);
    }    
    res.render("foradmin")
    
})

app.get("/admin/uploadfiles", async (req, res) =>{
    const result = await Image.find()
    res.send(result)
})


app.get("/teacherlogin", (req, res)=>{
    res.render("teacher_login")
})

app.post("/teacherlogin", async (req, res)=>{
        const obj = req.body;
        currentteacher = obj.name;
        const result = await Teacher.findOne({name:obj.name});
        const check = await bcrypt.compare(obj.password,result.password)
        if(result && check){
            res.redirect("/teacher")
        }
        else{
            res.send("Not Auth")
        }       

})

app.get("/teacher", (req, res)=>{
    res.render("forteacher", {currentteacher:currentteacher})
})

app.post("/teacher", async (req, res)=>{
    const obj = req.body;
    const doc = new Student(obj);
    const result = await Student.insertMany([doc]);
    if(result){
        res.redirect("/teacher")
        res.render("forteacher", {currentteacher:currentteacher})
    }
    else{
        res.send("Some error occured !!");
    }
    
})

app.get("/studentlogin", (req, res)=>{
    res.render("student_login");
})

app.post("/studentlogin", async (req, res)=>{
    const obj = req.body;
    const result = await Student.findOne(obj);
    if(result != null){
        res.send("Hello student")
    }
    else{
        res.send("Not Add pls contact your teacher")
    }
})

app.listen(PORT, (req, res) => {
    console.log(`The app is running on ${PORT} port`);
})