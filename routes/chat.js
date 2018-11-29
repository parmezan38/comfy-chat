const   express = require('express'),
        router = express.Router(),
        nameGenerator = require('../bin/name_generator'),
        colorGenerator = require('../bin/color_generator'),
        lobbyManager = require('../bin/lobby_manager'),
        middleware = require('../middleware/index');
// Lobby
router.get('/chat', middleware.isLoggedIn, function(req, res){
    res.render('chat/lobby', {lobby: lobbyManager.giveLobbyData() } );
});
// Room
router.get('/chat/:room', middleware.isLoggedIn, function(req, res){
    let room = lobbyManager.getRoom(req.params.room);
    if(!lobbyManager.checkIfRoomFull(room)){
        let userInfo = {};
        userInfo.username = nameGenerator.capitalizeAndRemoveUnderscores(req.user);
        userInfo.color1 = colorGenerator.deconstructColorCode(req.session.color1);
        userInfo.color2 = colorGenerator.deconstructColorCode(req.session.color2);
        if(lobbyManager.checkIfUserExistsInRoom(room.id, userInfo.username)){
            res.redirect('/chat');
        } else {
            lobbyManager.addUserToRoom(room.id, userInfo.username);
            res.render('chat/room', {room: room});
        }
    } else {
        res.redirect('/chat');
    }
});

module.exports = router;