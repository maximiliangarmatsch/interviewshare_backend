const bcrypt = require('bcrypt-node')
module.exports = {
  encrypt: function (password, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }
        if (hash) {
          return callback(hash)
        }
        next()
      })
    })
  }
}
