const express = require("express");
const app = express();
const PORT = 80;

app.get("/", (req, res) =>{
    res.send("Hello")
})


app.listen(PORT, (req, res)=>{
    console.log(`The app is running on ${PORT} port`);  
})