const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

io.on("connection", (socket) => {

    //console.log("a user connected");

    socket.on("chat message", (msg) => {
        
        // console.log("message: " + msg);
        io.emit("chat message", msg);
      
    });

    socket.on("disconnect", () => {

        console.log("a user disconnected");

    });

});

server.listen(5000);