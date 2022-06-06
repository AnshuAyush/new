const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name:String,
    class:Number,
    roll:Number  
});


const student = new mongoose.model("student", Schema);

module.exports = student