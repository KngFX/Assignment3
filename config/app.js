let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

let mongoose = require('mongoose');
let DB = require('./db');

mongoose.connect(DB.URI);
let mongDB = mongoose.connection;
mongDB.on('error', console.error.bind(console, 'Connection Error'));
mongDB.once('open', () => {
  console.log('Connected to the MongoDB');
})

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let assignmentsRouter = require('../routes/assignments'); // Changed from workoutsRouter

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignmentslist', assignmentsRouter); // Changed route

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
