var static = require('routes/static');
var v1 = require('routes/v1');

module.exports = app => {
  static(app)
  v1(app)
}
