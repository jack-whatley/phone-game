const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

let users = [];
let rooms = [1];

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

io.on("connection", (socket) => {

    // console.log(`user id: ${socket.id}`); // this works

    socket.join(rooms[1]);

    socket.on("host game", (userId) => {

        let roomCode = Math.floor(Math.random() * 100) + 10;
        rooms.push(roomCode);
        socket.join(roomCode);
        io.sockets.in(roomCode).emit("connectedRoom", roomCode);

    });

    socket.on("join game", (code) => {

        socket.join(code);
        io.sockets.in(code).emit("connectedRoom", code);

    });

    socket.on("submit name", (id, username, room) => {

        users.push({id: id, name: username, room: room});
        let user = socket.id;
        let currentUser = users.findIndex((x) => x.id === user)
        io.sockets.in(users[currentUser].room).emit("send users", users);

    });

    socket.on("receive message", (msg) => {

        let user = socket.id;
        let currentUser = users.findIndex((x) => x.id === user);
        io.sockets.in(users[currentUser].room).emit("send message", users[currentUser].name, msg);

    });

    socket.on("disconnect", () => {

        // console.log(`user dc'd: ${socket.id}`); // this works
        let dcUser = socket.id;
        let currentUser = users.findIndex((x) => x.id === dcUser);
        users.splice(currentUser, 1);
        // console.log(users)

    });

});

// remember this is branch: lobby-test

server.listen(5000);