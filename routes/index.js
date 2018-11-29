const   express = require('express'),
        router = express.Router(),
        db = require('../models/index'),
        nameGenerator = require('../bin/name_generator'),
        passport = require('passport'),
        middleware = require('../middleware/index');

// Index
router.get('/', function(req, res){
    res.render('index');
});
// Login
router.post('/login', function(req, res){
    let username = nameGenerator.decapitalizaAndRemoveSpaces(req.body.username.trim() ),
    password = req.body.password.toLowerCase();
    db.user.findOne({ where: {name: username } }).then(user => {
        if (!user) {
            req.flash('error', 'Wrong username and/or password');
            res.redirect('/login');            
        } else if (!user.validPassword(password)) {
            req.flash('error', 'Wrong username and/or password');
            res.redirect('/login');
        } else {
            let user_id = user.dataValues.name;
            req.session.color1 = user.dataValues.color1;
            req.session.color2 = user.dataValues.color2;
            req.login(user_id, err => {
                let upperCaseUsername = nameGenerator.capitalizeAndRemoveUnderscores(username);
                req.flash('success', 'You have logged in as ' + upperCaseUsername + '.');
                res.redirect('/chat');
            });
        }
    });
});
router.get('/login', middleware.isLoggedIn, function(req, res){
    res.render('login');
});
router.get('/logout', middleware.isLoggedIn, function(req, res){
    req.logout();
    req.flash('success', 'You have logged out.');
    res.redirect('/');
});

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});
  
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

module.exports = router;