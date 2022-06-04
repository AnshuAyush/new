const mongoose = require("mongoose")

const mySchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String

});

const Teacher = new mongoose.model("Teacher", mySchema);

module.exports = Teacher

