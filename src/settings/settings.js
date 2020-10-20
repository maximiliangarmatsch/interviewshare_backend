import dotenv from 'dotenv';

dotenv.config();

module.exports ={
    secret: process.env.secret, 
    tokenLife : process.env.tokenLife,
    refreshTokenSecret: process.env.refreshTokenSecret,
    refreshTokenLife : process.env.refreshTokenLife
}
