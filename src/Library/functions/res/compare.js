const bcrypt = require('bcrypt-node')
module.exports = {
  compare:  (password,hashedPassword, callback) =>{
    bcrypt.compare(password, hashedPassword, (err, result)=> {
        if(err){ return callback(err,null) }
        if(result){ 
            return callback(null,result) 
        }
    });
  }
}
