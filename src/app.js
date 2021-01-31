const express = require('express')
const uuid = require('uuid').v4
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const Routes = require('./routes/router')
const errorHandler = require('./Components/Error/errorhandler')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const FileStore = require('session-file-store')(session)
const secret = require('./Authentication/Secrets/generateSecret')


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
app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You got home page!\n`)
  })    
Routes(app)
errorHandler(app)

module.exports = app
