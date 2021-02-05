const { switchToPage } = require('pdfkit')
const AuthorizationError = require('../Components/Error/authentication')
exports.authMiddleware = (req, res, next) => {
  const { clientID, redirectURI, grantType } = req.query
  if (!clientID) { throw new AuthorizationError('Missing required parameter: client_id', 'invalid_request') }
  if (!redirectURI) { throw new AuthorizationError('Missing required parameter: redirect', 'invalid_request') }
  if (!grantType) { throw new AuthorizationError('Missing required parameter: GrantType', 'invalid_request') }
  if (typeof clientID !== 'string' && typeof grantType !== 'string') { throw new AuthorizationError('Invalid parameter: client_id must be a string', 'invalid_request') }
 
  next()
}
