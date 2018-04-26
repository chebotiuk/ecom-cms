var chatController = require('../controllers/chatController');

module.exports = app =>
  app
    .get('/chat', (req, res) => chatController.getView(req, res))
