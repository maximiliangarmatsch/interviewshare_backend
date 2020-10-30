const {userValidation,employerInsert, encrypt} = require('../models/usersModel');
const config = require('../settings/settings');
const jwt = require('jsonwebtoken');
const tokenList = {};
const cookie = require('cookie-parser');



function tokenForUser (userId){
  const timeStamp = new Date().getTime();
  const payload = {  sub : userId , iat : timeStamp }
  const token = jwt.sign(payload, config.secret , {expiresIn: Math.floor(Date.now() / 1000) + (15),issuer: 'interviewshare.com',audience: userId})
  const refreshToken = jwt.sign(payload, config.refreshTokenSecret,{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60),issuer: 'interviewshare.com',audience: userId})
  const access = { 
        "token": token,
        "refreshToken": refreshToken,
      };
  tokenList[refreshToken] = access
  return access
}
exports.logout = function (req , res , next) {
  if(req.cookies.token){
  res.cookie('x-i-tkn', '' , { maxAge: 1,httpOnly:true})
  res.cookie('x-i-ref', '' , { maxAge: 1,httpOnly:true})
  
  }else{
    res.send.status(401).json({error: "Please login in first to logout"})
  }
  
};
exports.token = function (req , res , next) {
  user = req.body.userId;
  refreshToken = req.cookies.refreshToken;
  tokenStored = tokenList[refreshToken].refreshToken;
    if(refreshToken && refreshToken===tokenStored){
      const tokenSet =tokenForUser(user)
      res.json({"user":user ,"token":tokenSet.token ,"refreshToken": tokenSet.refreshToken })
    }
}
exports.signIn = function(req ,res ,next){
    //User has already had their email and password Auth
    //We just need to give them a token
    
    const tokenSet =tokenForUser(req.user)
    res.cookie('x-i-tkn' , tokenSet.token , { maxAge: 1000 * 60 * 60 *3,httpOnly:true});
    res.cookie('x-i-ref' , tokenSet.refreshToken ,{ maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly:true})  
    res.json({"user":req.user ,"token":tokenSet.token ,"refreshToken": tokenSet.refreshToken })
}
exports.eSignUp = function (req, res, next) {
  const {email} =  req.body;
  const {password} =  req.body;
  const {name} =  req.body;
  const {address} =  req.body;
  const {countryId} =  req.body;  
  const {city} =  req.body;
  const {vat} =  req.body;

  // See if an email and password exists in request 
  if (!email || !password){
    res.status(422).json({error:"Email or Password not provided"})
  }else{
   // If a user with email doesn't exist ,create and save user record 
   userValidation(email,name,vat, (err ,present ,count) => {
     if(err){res.status(500).json({error:err.message})}
     if(present && count == 3){
      encrypt(password,(hash)=>{
        employerInsert(email,hash,name ,address,countryId,city,vat ,(err,response) =>{
          if(err){res.status(500).json({error:err.message})}
          // res.status(200).send("User is Authenticated")
          const tokenSet = tokenForUser(response.id);
          cookie(config.Secret)
          //return cookies along with tokens and refresh tokens
          res.cookie('x-i-tkn' , tokenSet.token , { maxAge: 1000 * 60 * 60 *3,httpOnly:true});
          res.cookie('x-i-ref' , tokenSet.refreshToken ,{ maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly:true})
          res.cookie('isEmp', true ,{ maxAge: 1000 * 60 * 60 *3})  
          res.json({"user":response.id ,"token":tokenSet.token ,"refreshToken": tokenSet.refreshToken })
          
      })
      
      })
     }else{
        // If a user with email exists ,return an error
       res.status(200).json({error:"User already active ,Uniqueness Violation"})
     }
   });
}
 

 
 

 

  // Respond to request indicating that user was created
};

