// const fs = require('fs');
// if (!fs.existsSync('designs')){
//     fs.mkdirSync('designs');
// }

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var designsRouter = require('./routes/design');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false,limit: '50mb' }));
//app.use(bodyParser({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/design', designsRouter);

module.exports = app;
