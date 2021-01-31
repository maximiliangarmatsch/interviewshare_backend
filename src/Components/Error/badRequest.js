
function BadRequestError(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.name = 'BadRequestError';
    this.message = message;
    this.status = 400;
  }
  BadRequestError.prototype.__proto__ = Error.prototype;
  module.exports = BadRequestError;