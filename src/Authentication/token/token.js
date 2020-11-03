const config = require('../Config/settings')
const jwt = require('jsonwebtoken')
const tokenList = {};
module.exports = {
     tokenForUser = (userId) => {
        const timeStamp = new Date().getTime();
        const payload = { sub: userId, iat: timeStamp };
        const token = jwt.sign(payload, config.secret, { expiresIn: Math.floor(Date.now() / 1000) + (15), issuer: 'interviewshare.com', audience: userId });
        const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), issuer: 'interviewshare.com', audience: userId });
        const access = {
            token,
            refreshToken
        };
        tokenList[refreshToken] = access;
    
        return access;
    },
    issueToken =  (req, res, next) => {
        console.log(tokenList);
        const user = req.body.userId;
        // refreshToken = req.cookies.refreshToken;
        const { refreshToken } = req.body;
        const storedRefreshToken = tokenList[refreshToken].refreshToken;
        tokenList[refreshToken] = '';
        if (storedRefreshToken == refreshToken) {
            jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
                if (decoded) {
                    const tokenSet = tokenForUser(decoded.sub);
                    res.json({ user, token: tokenSet.token, refreshToken: tokenSet.refreshToken });
                }
            });
        } else {
            res.status(403).json({ error: 'Unauthorized Access' });
        }
    }

}