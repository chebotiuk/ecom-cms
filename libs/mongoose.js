var mongoose = require('mongoose');
var config = require('config');
var bluebird = require('bluebird');

var log = require('libs/logger')(module);

mongoose.Promise = bluebird;
mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'))
  .then(() => { log.info('mongooose connected') })
  .catch(err => { throw err })

module.exports = mongoose;
