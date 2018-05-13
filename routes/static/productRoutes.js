var {
  getView,
} = require('controllers/productController');

module.exports = app =>
  app.get('/products', (req, res) => getView(req, res))
