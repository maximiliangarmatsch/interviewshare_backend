const Authentication = require('./src/controllers/authentication')


module.exports = function(app){
        // app.get('/', function(req, res ,next){
        //     res.send("Welcome to Interview Share backend")
        // })
        app.post('/signin', Authentication.signin)

}