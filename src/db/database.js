const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/school")
.then(()=>console.log("DB CONNECTED !!"))
.catch((err)=>console.log(err))