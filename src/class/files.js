const mongoose = require("mongoose");


var mySchema = new mongoose.Schema({
    name: String,
    desc: String,
    file:Buffer
});

const file = new mongoose.model("file", mySchema);
module.exports = file