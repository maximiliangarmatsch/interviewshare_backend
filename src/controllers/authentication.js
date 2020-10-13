const {checkUser} = require('../models/usersModel');
const fs = require('fs');
const path = require('path');
exports.signin = function (req, res, next) {
  const { email } = req.body;
  const { password } = req.body;
  if (!email || !password){
    res.status(403).json({error:"Email or Password not provided"})
  }else{
   // See if a user with given email exists
  checkUser(email,(data )=>{
    if(data[0] == undefined || data[0] == null) {res.status(403).json({error:"User Not Found"})}
    else {
      res.status(200).send(data[0])
    }
  });
}
 
  // See if a user with given email exists
 
  // If a user with email exists ,return an error

  // If a user with email doesn't exist ,create and save user record

  // Respond to request indicating that user was created
};

