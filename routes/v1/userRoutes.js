var {
  read,
  readOne,
} = require('controllers/userController');
var { api } = require('routes/endpoints');

module.exports = app =>
  app
    .get(api.v1 + '/users', (req, res, next) => read(req, res, next))
    .get(api.v1 + '/user/:id', (req, res, next) => readOne(req, res, next))
