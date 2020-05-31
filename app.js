var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config');
var mongoose = require('mongoose');
var ejs = require('ejs');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var tasksRouter = require('./routes/tasks');

//mongodb://heroku_7vdvrxnw:heroku_7vdvrxnw@ds135107.mlab.com:35107/heroku_7vdvrxnw
//mongodb://heroku_7vdvrxnw:8rv6g80s79esttcefprpmcdsq2@ds135107.mlab.com:35107/heroku_7vdvrxnw
//mongodb://localhost:27017/todolist
mongoose.connect('mongodb://heroku_7vdvrxnw:8rv6g80s79esttcefprpmcdsq2@ds135107.mlab.com:35107/heroku_7vdvrxnw', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB');
});

var app = express();
const mongoStore = connectMongo(expressSession);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

app.use(expressSession({
	secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/tasks', tasksRouter);


// local 3000, 4000, 5000
//heroku 80, 8080
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
