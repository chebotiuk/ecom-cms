<h2>Chat</h2>

<script src="/js/socket.io.js"></script>
<script type="text/javascript">
  (function() {
    var socket = io();
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  })();
</script>
