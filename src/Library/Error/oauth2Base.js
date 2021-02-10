
const OAuth2Error = (message, code, uri, status) => {
  Error.call(this)
  this.message = message
  this.code = code || 'server_error'
  this.uri = uri
  this.status = status || 500
}
OAuth2Error.prototype.__proto__ = Error.prototype
module.exports = OAuth2Error
