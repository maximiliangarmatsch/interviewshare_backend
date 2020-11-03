const bcrypt = require('bcrypt-node');
module.exports ={ 
    compare =(candidatePassword, hashedPassword, callback) => {
    bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
        if (err) { 
            return callback(err, null)
        }
        return callback(null, isMatch)
    })
}
}