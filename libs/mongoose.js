var mongoose = require('mongoose');
var config = require('config');

var log = require('libs/logger')(module);

mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'))
  .then(() => { log.info('mongooose connected') })
  .catch(err => { throw err })

mongoose.Promise = global.Promise;
module.exports = mongoose;
