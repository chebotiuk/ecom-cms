var log = require('libs/logger')(module);
var socketio = require('socket.io');

module.exports = function (server) {
  var io = socketio(server, {
    origins: 'localhost:*',
    logger: log,
  });

  io.on('connection', function (socket) {
    socket.on('message', function (text, cb) {
      socket.broadcast.emit('message', text);
      cb(text);
    });
  });
}
