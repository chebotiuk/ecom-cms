var { getView } = require('controllers/chatController')
var checkAuth = require('middleware/checkAuth')

module.exports = app =>
  app.get('/chat', checkAuth, (req, res) => getView(req, res))
