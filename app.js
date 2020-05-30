var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config');
var mongoose = require('mongoose');
var ejs = require('ejs');
const expressSession = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var tasksRouter = require('./routes/tasks');

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB');
});

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}

app.use(expressSession({
    secret: 'secret'
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/tasks', tasksRouter);

/*
app.get('/users/:username/tasks/', function (req, res) {
  res.send(req.params)
})*/

 
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
