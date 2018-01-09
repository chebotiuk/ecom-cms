var path = require('path');
var mongoose = require('mongoose');
var config = require(path.join(__dirname, '../config'));

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'));

module.exports = mongoose;