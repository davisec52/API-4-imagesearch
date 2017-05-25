const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DBURI);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Image search server now listening...");
});