var util = require('util');
var http = require('http');
 
function HttpError(status, message) {
  Error.captureStackTrace(this, HttpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || 'Error';
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

function AuthError(message) {
  Error.captureStackTrace(this, AuthError);

  this.message = message
}
util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.HttpError = HttpError;
exports.AuthError = AuthError;
