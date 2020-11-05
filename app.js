var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routes files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Instantiates an express instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// logger middleware. Will improve the server log!
app.use(logger('dev'));
// Recognize incoming object as a JSON object
app.use(express.json());
// Recognize incoming object as a String or Array
app.use(express.urlencoded({ extended: false }));
// The middleware will parse the Cookie header on the request and expose the cookie data as the property req.cookies
app.use(cookieParser());
// To serve static files such as images, CSS files, and JavaScript files
// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file
app.use(express.static(path.join(__dirname, 'public')));
// Use routes files with the given path
// All index routes are loaded from the root /
app.use('/', indexRouter);
// All user related routes are loaded from /users
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
