const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const router = require('../router');

const app = express();

// Logger
app.use(logger('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' }, (err, writer) => {
        if (err) {
            throw err;
        }
        writeMyData(writer);
    })
}));
//  App Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());

// Routes
router(app);
app.use('/v1', apiRouter);
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.status(404).json({ error: `Error ${err.status} Page ${err.message}` });
});

module.exports = app;
