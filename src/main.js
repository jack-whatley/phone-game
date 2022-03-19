// consts
const hostB = $("#host-button");
const joinB = $("#join-button");
const roomNum = $("#room-num");

// code
let roomCode = 1;

joinB.on("click", function() {

    roomCode = prompt("Enter the room code:", "abc");
    console.log(`code: ${roomCode}`);

});
