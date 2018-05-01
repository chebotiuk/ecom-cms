'use strict';

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = _socket2.default.connect('', {
  reconnection: false
});

var form = document.querySelector('#form');
var input = document.querySelector('#input');
var ul = document.querySelector('#ul');

function addMessage(username, text) {
  var li = document.createElement('li');
  li.textContent = username + ': ' + text;
  ul.appendChild(li);
}

function sendMessage(e) {
  e.preventDefault();
  var text = input.value;
  input.value = '';

  socket.emit('message', text, addMessage);

  return false;
}

socket.on('message', addMessage).on('leave', addMessage).on('join', addMessage).on('connect', function () {
  console.log('connection successful');
  form.addEventListener('submit', sendMessage);
  input.removeAttribute('disabled');
}).on('disconnect', function () {
  console.warn('connection lost');
  form.removeEventListener('submit', sendMessage);
  input.setAttribute('disabled', true);

  // handling reconnect
  setTimeout(reconnect, 500);
}).on('logout', function () {
  location.href = '/';
});

function reconnect() {
  socket.on('connect_error', function () {
    setTimeout(reconnect, 500);
  });

  socket.connect();
}