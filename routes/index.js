var views = require('routes/views')
var v1 = require('routes/v1')

module.exports = app => {
  views(app)
  v1(app)
}
