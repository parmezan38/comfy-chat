const express = require('express'),
      app = express(),
      IP = process.env.IP || '127.0.0.1',
      PORT = process.env.PORT || 8080,
      path = require('path'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      flash = require('connect-flash'),
      socketManager = require('./bin/socket_manager'),
      middleware = require('./middleware/index');
// Route Requiring
const indexRoutes = require('./routes/index'),
      accountRoutes = require('./routes/account'),
      chatRoutes = require('./routes/chat');

const server = app.listen(PORT, IP, () => {
  console.log('Server has started, listening on port ' + PORT);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'putyoursecrethere',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60000000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(middleware.storeUserInfoToLocals);
socketManager(server);

// Routes
app.use(indexRoutes);
app.use(accountRoutes);
app.use(chatRoutes);
app.get('*', function (req, res) {
  res.send('Page does not exist');
});
