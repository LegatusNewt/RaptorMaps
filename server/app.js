const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const solarRouter = require('./routes/solar');

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/', indexRouter);
app.use('/api/v1/solar_farms', solarRouter);

app.use(favicon(path.join(__dirname,'public','favicon.ico')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
	
// enable CORS without external module
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // render the error page
  console.log(err.message);
});

module.exports = app;


