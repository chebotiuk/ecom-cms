var productRoutes = require('./productRoutes');
var chatRoutes = require('./chatRoutes');
var loginRoutes = require('./loginRoutes');
var homeRoutes = require('./homeRoutes');

module.exports = app => {
  homeRoutes(app)
  loginRoutes(app)
  chatRoutes(app)
  productRoutes(app)
}
