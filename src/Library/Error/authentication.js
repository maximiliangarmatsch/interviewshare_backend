const OAuth2Error = require('./oauth2Base')

function AuthorizationError (message, code, uri, status, res) {
  if (!status) {
    switch (code) {
      case 'invalid_request': status = 400; break
      case 'unauthorized_client': status = 403; break
      case 'access_denied': status = 403; break
      case 'unsupported_response_type': status = 501; break
      case 'invalid_scope': status = 400; break
      case 'temporarily_unavailable': status = 503; break
    }
  }
  res.status(status).json({ error: this.name + ' ' + code, message: message })

  OAuth2Error.call(this, message, code, uri, status)
  Error.captureStackTrace(this, arguments.callee)
  this.name = 'AuthorizationError'
}
AuthorizationError.prototype.__proto__ = OAuth2Error.prototype

module.exports = AuthorizationError
