const lobby = require('./data/lobby_data');

let lobbyManager = {};

lobbyManager.giveLobbyData = function () {
  return lobby.rooms;
};
lobbyManager.checkIfRoomFull = function (room) {
  if (!room) {
    return room.users.length >= room.maxUsers;
  }
};
lobbyManager.getRoom = function (roomId) {
  for (let i = 0; i < lobby.rooms.length; i++) {
    if (lobby.rooms[i].id === roomId) {
      return lobby.rooms[i];
    }
  };
};
lobbyManager.addUserToRoom = function (roomId, userName) {
  let room = this.getRoom(roomId);
  if (!this.checkIfRoomFull(room) && !room.users.includes(userName)) {
    room.users.push(userName);
  }
};
lobbyManager.removeUserFromRoom = function (roomId, userName) {
  let room = this.getRoom(roomId),
      indexOfUser = room.users.indexOf(userName);
  if (indexOfUser >= 0) {
    room.users.splice(indexOfUser, 1);
  }
};
lobbyManager.checkIfUserExistsInRoom = function (roomId, userName) {
  let room = this.getRoom(roomId);
  return room.users.includes(userName);
};
module.exports = lobbyManager;
