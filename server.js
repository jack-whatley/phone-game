const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

let playerList = [];

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

io.on("connection", (socket) => {

    console.log("a user connected: " + socket.id);

    socket.on("chat message", (msg, username) => {
        
        // console.log("message: " + msg);
        io.emit("chat message", msg, username);
      
    });

    socket.on("get username", (username, id) => {

        playerList.push({id: id, name: username});
        console.log(playerList);
        io.emit("send usernames", playerList);

    });

    socket.on("disconnect", () => {

        console.log("a user disconnected");

    });

});

server.listen(5000);