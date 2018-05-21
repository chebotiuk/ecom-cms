var {
  getView,
} = require('controllers/loginController')

module.exports = app =>
  app.get('/login', (req, res) => getView(req, res))
