const express = require("express");
require("./db/database")
const app = express();
const PORT = 80;
const router = require("./Router/myrouter")


app.set("view engine", "hbs");
app.use(router)

app.listen(PORT, (req, res) => {
    console.log(`The app is running on ${PORT} port`);
})