const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const Routes = require('./routes/router')
const logger = require('./Components/Logger/logger')
const errorHandler = require('./Components/Error/errorhandler')
const fileUpload = require('express-fileupload')


//  App Setup
const app = express()
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// Routes
Routes(app)
// Logger
logger(app)
// Error handling
errorHandler(app)
module.exports = app
