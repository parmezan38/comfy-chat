const lobby = require('./data/lobby_data');

let lobbyManager = {};

lobbyManager.giveLobbyData = () => {
    return lobby.rooms;
};
lobbyManager.checkIfRoomFull = room => {
    if(room != null){
        if(room.users.length >= room.maxUsers){
            return true;
        } else {
            return false;
        }
    }
};
lobbyManager.getRoom = roomId => {
    for (let i = 0; i < lobby.rooms.length; i++) {
        if (lobby.rooms[i].id === roomId) {
            return lobby.rooms[i];
        }
    };
};
lobbyManager.addUserToRoom = (roomId, userName) => {
    let room = lobbyManager.getRoom(roomId);
    if(!lobbyManager.checkIfRoomFull(room) && !room.users.includes(userName) ){
        room.users.push(userName);
    }
};
lobbyManager.removeUserFromRoom = (roomId, userName) => {
    let room = lobbyManager.getRoom(roomId);
    let indexOfUser = room.users.indexOf(userName);
    if(indexOfUser >= 0){
        room.users.splice(indexOfUser, 1);
    }
};
lobbyManager.checkIfUserExistsInRoom = (roomId, userName) => {
    let room = lobbyManager.getRoom(roomId);
    if(room.users.includes(userName)){
        return true;
    } else {
        return false;
    }
};
module.exports = lobbyManager;


