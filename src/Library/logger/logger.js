const path = require('path')
const logger = require('morgan')
const fs = require('fs')

module.exports = function (app) {
  app.use(logger('combined', {
    stream: fs.createWriteStream(path.join(__dirname, '../../logs/access.log'), { flags: 'a' }, (err, writer) => {
      if (err) {
        throw err
      }
      writeMyData(writer)
    })
  }))
}
