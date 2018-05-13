var {
  login,
  logout,
} = require('controllers/loginController');
var { api } = require('../endpoints');

module.exports = app =>
  app
    .post(api.v1 + '/login', (req, res, next) => login(req, res, next))
    .post(api.v1 + '/logout', (req, res, next) => logout(req, res, next))
