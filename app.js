const   express = require('express'),
        app = express(),
        IP = process.env.IP || '127.0.0.1',
        PORT = process.env.PORT || 8080,
        bodyParser = require('body-parser'),
        db = require('./models/index'),
        session = require('express-session'),
        passport = require('passport'),
        socket = require('socket.io'),
        flash = require('connect-flash'),
        sanitizeHtml = require('sanitize-html'),
        lobbyManager = require('./bin/lobby_manager'),
        nameGenerator = require('./bin/name_generator'),
        colorGenerator = require('./bin/color_generator');

// Route Requiring
const   indexRoutes = require('./routes/index'),
        accountRoutes = require('./routes/account'),
        chatRoutes = require('./routes/chat');

const server = app.listen(PORT, IP, () => {
    console.log('Server has started, listening on port ' + PORT);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false} ) );
app.use(express.static(__dirname + '/public'));
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
app.use((req, res, next) => {
    if(req.user){
        res.locals.userInfo = {
            username: nameGenerator.capitalizeAndRemoveUnderscores(req.user),
            color1: colorGenerator.deconstructColorCode(req.session.color1),
            color2: colorGenerator.deconstructColorCode(req.session.color2)
        };
    } else {
        res.locals.userInfo = null;
    }
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const io = socket(server);
io.of('/chat').on('connection', socket => {
    socket.on('joinRoom', data => {
        socket.username = data.userInfo.username;
        socket.room = data.room.id; 
        socket.join(data.room.id);
    });
    socket.on('chat', data => {
        data.message = sanitizeHtml(data.message, { allowedTags: [], allowedAttributes: [] });
        io.of('/chat').in(data.room.id).emit('chat', data);
    });
    socket.on('disconnect', () => {
        lobbyManager.removeUserFromRoom(socket.room, socket.username);
    });
});

// Sequelize Connection Test
db.sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Routes
app.use(indexRoutes);
app.use(accountRoutes);
app.use(chatRoutes);
app.get('*', function(req, res){
    res.send('Page does not exist');
});




