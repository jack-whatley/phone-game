const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

let playerList = [];

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

io.on("connection", (socket) => {

    console.log(`user id: ${socket.id}`); // this works

    

    socket.on("disconnect", () => {

        console.log(`user dc'd: ${socket.id}`); // this works

    });

});

// remember this is branch: lobby-test

server.listen(5000);