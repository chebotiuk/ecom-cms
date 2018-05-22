var productRoutes = require('./productRoutes')
var loginRoutes = require('./loginRoutes')
var userRoutes = require('./userRoutes')

module.exports = app => {
  loginRoutes(app)
  productRoutes(app)
  userRoutes(app)
}
