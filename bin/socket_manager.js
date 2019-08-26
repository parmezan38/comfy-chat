const socket = require('socket.io');
const sanitizeHtml = require('sanitize-html');
const lobbyManager = require('./lobby_manager');

module.exports = server => {
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
