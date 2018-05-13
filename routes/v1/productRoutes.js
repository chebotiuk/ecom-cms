var {
  create,
  read,
  readOne,
} = require('controllers/productController');
var { api } = require('routes/endpoints');

module.exports = app =>
  app
    .get(api.v1 + '/products', (req, res, next) => read(req, res, next))
    .get(api.v1 + '/products/:id', (req, res, next) => readOne(req, res, next))
    .post(api.v1 + '/products', (req, res, next) => create(req, res, next))
