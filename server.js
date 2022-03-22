import express from "express";

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "/index.html"));

});

app.listen(PORT);