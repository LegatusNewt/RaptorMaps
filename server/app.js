#!/usr/bin/env node

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const favicon = require('serve-favicon');
const debug = require('debug')('server:server');

const app = express();
const http = require('http');

app.use(cors());
const server = require('http').Server(app);

const socketManager = require('./socket/index.js')(server);

const indexRouter = require('./routes/index');
const solarRouter = require('./routes/solar').router;

global.appRoot = path.resolve(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Log all requests
app.use(function (req, res, next) {
  console.log(req.url);
  next();
});

app.use('/api/v1/', indexRouter);
app.use('/api/v1/solar_farms', solarRouter);

app.use(favicon(path.join(__dirname,'public','favicon.ico')));


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

/**
 * Get port from environment and store in Express.
 */

let port = 3000;
app.set('port', port);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log(`Listening on ${bind}`);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

 /**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;


