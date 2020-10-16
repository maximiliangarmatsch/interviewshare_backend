import dotenv from 'dotenv';

dotenv.config();
export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
module.exports ={
    secret: process.env.secret, 
}
