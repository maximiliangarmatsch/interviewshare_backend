const {getUserIdBySecret, setUserAsVerified} = require('../../Components/functions/auth/verifyUser')
exports.verifyUser = (req, res, next) => {
    const confirmationCode = req.params.confirmationCode
    getUserIdBySecret(confirmationCode,(err, id)=>{
        if(err || !id){
            return res.status(404).send({ status:"Err! Verification Failed",message: "Invalid Code passed or Code Expired" });
          }else{
            setUserAsVerified(id,(data)=>{
                const verified = data.is_verified
                if(verified == null){
                    return res.status(401).send({ status:"Err! Already Verified",message: "User is already verified" });
                }
                if(verified){
                    return res.status(200).send({status:"Verified",message: "User Verified Successfully"})
                }
            })
          }

    })
}