const express = require('express'),
      router = express.Router(),
      db = require('../models/index'),
      nameGenerator = require('../bin/name_generator'),
      passport = require('passport'),
      middleware = require('../middleware/index');

// Index
router.get('/', function (req, res) {
  res.render('index');
});
// Login
router.post('/login', function (req, res) {
  const username = nameGenerator.decapitalizaAndRemoveSpaces(req.body.username.trim());
  const password = req.body.password.toLowerCase();
  db.user.findOne({ where: { name: username } }).then(user => {
    if (!user) {
      req.flash('error', 'Wrong username and/or password');
      res.redirect('/login');
    } else if (!user.validPassword(password)) {
      req.flash('error', 'Wrong username and/or password');
      res.redirect('/login');
    } else {
      const userId = user.dataValues.name;
      req.session.color1 = user.dataValues.color1;
      req.session.color2 = user.dataValues.color2;
      req.login(userId, err => {
        if (err) {
          console.log(err);
        }
        const upperCaseUsername = nameGenerator.capitalizeAndRemoveUnderscores(username);
        req.flash('success', 'You have logged in as ' + upperCaseUsername + '.');
        res.redirect('/chat');
      });
    }
  });
});
router.get('/login', middleware.isLoggedIn, function (req, res) {
  res.render('login');
});
router.get('/logout', middleware.isLoggedIn, function (req, res) {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

passport.serializeUser(function (userId, done) {
  done(null, userId);
});

passport.deserializeUser(function (userId, done) {
  done(null, userId);
});

module.exports = router;
