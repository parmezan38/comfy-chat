const   socket = require('socket.io'),
        sanitizeHtml = require('sanitize-html'),
        lobbyManager = require('./lobby_manager');
        
module.exports = function(server){
    const io = socket(server);
    io.of('/chat').on('connection', socket => {
        socket.on('joinRoom', ({ userInfo, room }) => {
            socket.username = userInfo.username;
            socket.room = room.id; 
            socket.join(room.id);
        });
        socket.on('chat', data => {
            data.message = sanitizeHtml(data.message, { allowedTags: [], allowedAttributes: [] });
            io.of('/chat').in(data.room.id).emit('chat', data);
        });
        socket.on('disconnect', () => {
            lobbyManager.removeUserFromRoom(socket.room, socket.username);
        });
    });
};