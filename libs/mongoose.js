var path = require('path');
var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'));
mongoose.Promise = global.Promise;

// mongoose.on('error', console.error.bind(console, 'connection error:'));
// mongoose.once('open', function() {
//   console.log("we're connected!")
// });

module.exports = mongoose;
