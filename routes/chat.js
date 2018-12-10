const express = require('express'),
      router = express.Router(),
      lobbyManager = require('../bin/lobby_manager'),
      middleware = require('../middleware/index');
// Lobby
router.get('/chat', middleware.isLoggedIn, function (req, res) {
  res.render('chat/lobby', { lobby: lobbyManager.giveLobbyData() });
});
// Room
router.get('/chat/:room', middleware.isLoggedIn, function (req, res) {
  let room = lobbyManager.getRoom(req.params.room);
  if (!lobbyManager.checkIfRoomFull(room)) {
    if (lobbyManager.checkIfUserExistsInRoom(room.id, res.locals.userInfo.username)) {
      res.redirect('/chat');
    } else {
      lobbyManager.addUserToRoom(room.id, res.locals.userInfo.username);
      res.render('chat/room', { room });
    }
  } else {
    res.redirect('/chat');
  }
});

module.exports = router;
