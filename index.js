// command : nodemon index.js
// https://www.tutorialspoint.com/expressjs/expressjs_routing.htm

let express = require("express");
let app = express();

app.get("/", function(req, res) {

    res.send("Hello World");

});

app.listen(3000);
