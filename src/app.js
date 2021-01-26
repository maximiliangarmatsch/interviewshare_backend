const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const Routes = require('./routes/router')
const errorHandler = require('./Components/Error/errorhandler')
const fileUpload = require('express-fileupload')

const app = express()
app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

Routes(app)

errorHandler(app)
module.exports = app
