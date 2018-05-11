var {
  getView,
  create,
  read,
  readOne,
} = require('../controllers/productController');

module.exports = app =>
  app
    .get('/products', (req, res, next) => req.xhr ? read(req, res, next) : getView(req, res))
    .get('/products/:id', (req, res, next) => readOne(req, res, next))
    .post('/products', (req, res, next) => create(req, res, next))
