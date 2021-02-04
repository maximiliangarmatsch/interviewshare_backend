const {getUserIdBySecret, setUserAsVerified} = require('../../Components/functions/auth/verifyUser')
const {welcomeEmail} = require('../../Components/functions/email/emailer')
exports.verifyUser = (req, res, next) => {
    const confirmationCode = req.params.confirmationCode
    getUserIdBySecret(confirmationCode,(err, id)=>{
        if(err || !id){
            return res.status(404).send({ status:"Err! Verification Failed",message: "Invalid Code passed or Code Expired" });
          }else{
            setUserAsVerified(id,(data)=>{
                if(data == null){
                    return res.status(401).send({ status:"Err! Already Verified",message: "User is already verified" });
                }
                const verified = data.is_verified   
                if(verified == true){
                    welcomeEmail(data.email)
                    return res.status(200).send({status:"Verified",message: "User Verified Successfully"})
                }
            })
          }

    })
}