function ForbiddenError(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.name = 'ForbiddenError';
    this.message = message;
    this.status = 403;
  }
  ForbiddenError.prototype.__proto__ = Error.prototype;
  module.exports = ForbiddenError;