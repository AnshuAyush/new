const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
    name:String,
    password:String
})

const admin = new mongoose.model("admin", mySchema);


module.exports = admin;