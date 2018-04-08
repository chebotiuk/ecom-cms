<h2>Chat</h2>
<div id="room">
  <ul id="ul"></ul>
  <form id="form">
    <input id="input" class="form-control" autocomplete="off">
  </form>
</div>

<script src="/js/socket.io.js"></script>
<script type="text/javascript">
  (function() {
    var socket = io();
    console.log(socket);

    var form = document.querySelector('#form');
    var input = document.querySelector('#input');
    var ul = document.querySelector('#ul');

    function addMessage(text) {
      var li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    }

    form.onsubmit = function(e) {
      e.preventDefault();

      var text = input.value;
      input.value = '';

      socket.emit('message', text, addMessage);

      return false;
    }

    socket.on('message', addMessage);
  })();
</script>
