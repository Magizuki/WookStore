var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var cartsRouter = require('./routes/carts');
var testAPIRouter = require("./routes/testAPI");
var app = express();
//var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
const mongoose = require('mongoose');
require('dotenv/config')

//Set Database Connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true}, () => {
  console.log('connected to DB!')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieSession({secret: "UserCredential"}));

app.use('/', indexRouter);
app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/carts', cartsRouter)
app.use("/testAPI", testAPIRouter)
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
