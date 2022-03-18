// command : npx nodemon index.js
// https://www.tutorialspoint.com/expressjs/expressjs_routing.htm

const express = require("express");
const app = express();

const path = require("path");

app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "/index.html"));

});

app.listen(3000);
