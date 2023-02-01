import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
let socket = io.connect("http://localhost:3000");

let room_id;
let player_id;
let player_name;
let createUserCallback;

socket.emit("CREATE_LOBBY", {
  player_id: "l5hoo9j01hhmbwh85uq",
  room_id: 16944,
});

socket.on("connect_error", (err) => {
  console.log("authentication error");
});
socket.on("SERVER_DATA", (data) => {
  console.log("data");
});

socket.on("CREATE_LOBBY_SUCCESSFUL", (data) => {
  room_id = data.room_id;
  console.log("lobby created " + data.room_id);
});

socket.on("JOIN_LOBBY_SUCCESSFUL", (data) => {
  console.log("lobby joined ", data);
});

socket.on("CREATE_USER_SUCCESSFUL", (data) => {
  console.log("user created", data);
  player_id = data.player_id;
  player_name = data.player_name;
  // change screen after create user
  createUserCallback?.(player_name);
  createUserCallback = null;
});

function setCreateUserCallback(callback) {
  createUserCallback = callback;
}

function enterGame(name) {
  socket.emit("CREATE_NEW_USER", {
    player_name: name.value,
    room_id,
  });
}

function updatePosition(joyStickData) {
  socket.emit("UPDATE_PLAYER_POSITION", {
    player_id: player_id,
    joyInputPosX: joyStickData.inputPosX,
    joyInputPosY: joyStickData.inputPosY,
    joyDirezione: joyStickData.direction,
    joyX: joyStickData.x,
    joyY: joyStickData.y,
  });
}
function updateAction(btn) {
  socket.emit("UPDATE_PLAYER_ACTION", {
    player_id: player_id,
    action: btn + "_pressed",
  });
}

export default {
  socket,
  player_name,
  createUserCallback,
  updateAction,
  updatePosition,
  enterGame,
  setCreateUserCallback,
};
