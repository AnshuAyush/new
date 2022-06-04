const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
    name:String,
    password:String
})

const admin = new mongoose.model("admin", mySchema);
const doc = new admin({
    name:"Anshu",
    password:"ans"
})

doc.save();

module.exports = admin;