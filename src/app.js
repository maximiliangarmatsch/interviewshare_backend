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
const FileStore = require('session-file-store')(session);

const app = express()
app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: '7eb5a67797ecf49fa6137b3a3bd1b1b83a27b470e3332d53386b628460de47ca369e20e5881b1b6aac1430fc8f0b67dbb11b6e648fa2f51cc714acc60ae4965d',
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
