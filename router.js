const Authentication = require('./src/controllers/authentication');
const Pdf = require('./src/controllers/pdf');
const Csv = require('./src/controllers/csv');
require('./src/services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignIn = passport.authenticate('local' ,{session: false});
module.exports = function(app){
    //Protected  Routes through middleware
        app.get('/',requireAuth, function(req, res ,next){
            res.send({hi : 'there'})
        })
        

    //Authentication  Routes with Middleware
        app.post('/signIn',requireSignIn, Authentication.signIn);
        app.post('/eSignUp', Authentication.eSignUp);
        app.get('./token', Authentication.token);
        app.get('./logout',Authentication.logout);
     //Utils Routes
        app.get('/pdf',Pdf.create);
        app.get('./csv',Csv.read)
        

}