var loginController = require('../controllers/loginController');

module.exports = app =>
  app
    .get('/login', (req, res) => loginController.getView(req, res))
    .post('/login', (req, res, next) => loginController.login(req, res, next))
    .post('/logout', (req, res, next) => loginController.logout(req, res, next))
