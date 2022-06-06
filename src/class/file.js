const mongoose = require("mongoose");

const scheama = new mongoose.Schema({
        filepath:String,
        data:Buffer
    }
)

const Image = mongoose.model("image", scheama);
module.exports = Image