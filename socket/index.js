var log = require('libs/logger')(module);
var User = require('models/user').User;
var socketio = require('socket.io');
var config = require('config');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore = require('libs/sessionStore');
var HttpError = require('error').HttpError;

function loadSession(sid) {
  return sessionStore.get(sid);
}

function loadUser(session) {
  if (!session.user) {
    log.debug(`Session ${session.id} is anonymous`);
    return null;
  }

  log.debug('retrieving user ', session.user);
  return User.findById(session.user);
}

module.exports = function (server) {
  var io = socketio(server, {
    origins: 'localhost:*',
    logger: log,
  });

  io.use(function(socket, next) {
    var handshake = socket.handshake;
    handshake.cookies = cookie.parse(handshake.headers.cookie || '');

    var sidCookie = handshake.cookies[config.get('session:key')];
    var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

    loadSession(sid)
      .then(session => {
        if (!session) {
          throw new HttpError(401, 'No session');
        }

        handshake.session = session;

        return session;
      })
      .then(loadUser)
      .then(user => {
        if (!user) {
          throw new HttpError(401, 'Not a user, anonymous user cant be connected');
        }

        handshake.user = user;
        return user
      })
      .then(() => {
        next();
        return;
      })
      .catch(err => {
        if (err instanceof HttpError) {
          next(new HttpError(err.status, err.message));
          return
        }

        next(err);
      })


    // var handshakeData = socket.request;
    // make sure the handshake data looks good as before
    // if (error) { next(new Error('not authorized')) };
    // else just call next()
  });

  io.on('connection', function (socket) {
    socket.on('message', function (text, cb) {
      socket.broadcast.emit('message', text);
      if (cb) cb(text);
    });
  });
}
