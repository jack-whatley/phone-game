const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

let roomList = [];
let users = [];

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

io.on("connection", (socket) => {

    console.log(`user id: ${socket.id}`); // this works

    socket.on("host game", (userId) => {

        let roomCode = Math.floor(Math.random() * 1000000) + 100000;
        console.log(roomCode);
        socket.join(roomCode);
        io.sockets.in(roomCode).emit("connectedRoom", roomCode);

    });

    socket.on("join game", (code) => {

        socket.join(code);
        io.sockets.in(code).emit("connectedRoom", code);

    });

    socket.on("submit name", (id, username, room) => {

        users.push({id: id, name: username, room: room});
        console.log(users);

    });

    socket.on("disconnect", () => {

        console.log(`user dc'd: ${socket.id}`); // this works

    });

});

// remember this is branch: lobby-test

server.listen(5000);