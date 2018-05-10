var chatController = require('../controllers/chatController');
var checkAuth = require('middleware/checkAuth');

module.exports = app =>
  app
    .get('/chat', checkAuth, (req, res) => chatController.getView(req, res))
