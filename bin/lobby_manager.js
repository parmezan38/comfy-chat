const lobby = require('./data/lobby_data');

let lobbyManager = {};

lobbyManager.giveLobbyData = () => {
    return lobby.rooms;
};
lobbyManager.checkIfRoomFull = room => {
    if(room !== null){
        if(room.users.length >= room.maxUsers){
            return true;
        } else {
            return false;
        }
    }
};
lobbyManager.getRoom = roomId => {
    lobby.rooms.forEach(lobbyRoom => {
        if (lobbyRoom.id === roomId) {
            return lobbyRoom;
        }
    });
};
lobbyManager.addUserToRoom = (roomId, userName) => {
    let room = this.getRoom(roomId);
    if(!this.checkIfRoomFull(room) && !room.users.includes(userName) ){
        room.users.push(userName);
    }
};
lobbyManager.removeUserFromRoom = (roomId, userName) => {
    let room = this.getRoom(roomId);
    let indexOfUser = room.users.indexOf(userName);
    if(indexOfUser >= 0){
        room.users.splice(indexOfUser, 1);
    }
};
lobbyManager.checkIfUserExistsInRoom = (roomId, userName) => {
    let room = this.getRoom(roomId);
    if(room.users.includes(userName)){
        return true;
    } else {
        return false;
    }
};
module.exports = lobbyManager;


