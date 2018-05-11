var {
  getView,
  login,
  logout,
} = require('../controllers/loginController');

module.exports = app =>
  app
    .get('/login', (req, res) => getView(req, res))
    .post('/login', (req, res, next) => login(req, res, next))
    .post('/logout', (req, res, next) => logout(req, res, next))
