const lobby = require('./data/lobby_data');

const lobbyManager = {
  giveLobbyData: function () { return lobby.rooms; },
  checkIfRoomFull: function (room) {
    if (!room) return room.users.length >= room.maxUsers;
  },
  getRoom: function (id) {
    for (let i = 0; i < lobby.rooms.length; i++) {
      if (lobby.rooms[i].id === id) {
        return lobby.rooms[i];
      }
    };
  },
  addUserToRoom: function (id, userName) {
    const room = this.getRoom(id);
    if (!this.checkIfRoomFull(room) && !room.users.includes(userName)) {
      room.users.push(userName);
    }
  },
  removeUserFromRoom: function (id, userName) {
    const room = this.getRoom(id);
    const indexOfUser = room.users.indexOf(userName);
    if (indexOfUser >= 0) room.users.splice(indexOfUser, 1);
  },
  checkIfUserExistsInRoom: function (id, userName) {
    const room = this.getRoom(id);
    return room.users.includes(userName);
  }
};

module.exports = lobbyManager;
