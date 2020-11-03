const {userValidation} = require('./functions/userValidation')
const {candidateInsert} =require('./functions/candidateInsert')
const {encrypt} = require('../../Components/encrypt');
const {tokenForUser} =require('../token/token')
exports.SignUp =  (req, res, next) => {
    const { 
        name,
        email,
        password,
        jobTitle
    } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: 'Email or Password not provided' })
    } 
    else {
        userValidation(email, (err, present) => {
            if (err) { 
                res.status(500).json({ error: err.message })
             }
            if (present && count == 3) {
                encrypt(password, (hash) => {
                    candidateInsert(name, email, hash, jobTitle , (err, response) => {
                        if (err) { 
                            res.status(500).json({ error: err.message }) 
                        }
                        const tokenSet = tokenForUser(response.id);
                        res.status(200).json({ user: response.id, token: tokenSet.token, refreshToken: tokenSet.refreshToken });
                    })
                })
            } else {
                res.status(200).json({ error: 'User already active ,Uniqueness Violation' });
            }
        })
    }
}