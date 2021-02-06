const express = require('express')
const uuid = require('uuid').v4
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const Routes = require('./routes/router')
const errorHandler = require('./Library/Error/errorhandler')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const FileStore = require('session-file-store')(session)
const secret = require('./Library/functions/res/generateSecret')

const app = express()
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: secret.toString(),
  resave: false,
  saveUninitialized: true
}))
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

Routes(app)
errorHandler(app)

module.exports = app
