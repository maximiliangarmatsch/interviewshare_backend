require('@babel/polyfill')
const debug = require('debug')('backendserver:server')
const app = require('../src/app')
const http = require('http')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on: ', port)

server.on('error', error)
server.on('listening', listening)

function error (error) {
  if (error.syscall !== 'listen') { throw error }
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:throw error
  }
}
function listening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
function normalizePort (val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}
