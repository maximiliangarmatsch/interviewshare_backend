const Authentication = require('./src/controllers/authentication');
const passportService = require('./src/services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignIn = passport.authenticate('local' ,{session: false});
module.exports = function(app){
        app.get('/',requireAuth, function(req, res ,next){
            res.send({hi : 'there'})
        })
        //Protected SignIn Route through middleware
        app.post('/signin',requireSignIn, Authentication.signIn);
        app.post('/signup', Authentication.signup);

}