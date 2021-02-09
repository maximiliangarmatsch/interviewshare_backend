const { getUserId } = require('../../Library/functions/auth/findIdByEmail')
const { passwordResetEmail} =require('../../Library/functions/email/emailer')
const { encrypt } = require('../../Library/functions/res/encrypt')
const { saveNewPass} = require('../../Library/functions/auth/saveNewPass')
module.exports={
    resetRequest:  (req, res, next)=> {
    const {email} = req.body;
    getUserId(email, (err, user) => {
        if (err) {
          res.status(500).json({ error: err.message })
          return
        }if(!user) {
            res.status(403).json({ 
                status: 403,
                code:'unauthorized_client',
                message: "Invalid Request User Not Found"
             })
        }if(user){
            passwordResetEmail(user.email, user.id,user.secret)
        }
    })
},
resetPassword : (req, res, next) => {
    const password = req.params.password
    const code = req.params.code
    const id = code.split('*/-ISA-@21*')[0]
    const secret = code.split('*/-ISA-@21*')[1]
    encrypt(password,(hash) => {
        saveNewPass(id,hash,secret,(err, saved) => {
            if(err || !saved){
                res.status(500).json({ 
                    status: 500,
                    code:'internal server error',
                    message: "unable to consider desired request"
                })
            }
            if(saved){
                res.status(200).json({ 
                    status: 200,
                    code:'ok',
                    message: "Password Reset Successfully"
                })
            }
        })
    })
}
}