const express = require("express")
var app = express();
var path = require('path');

var indexRouter = require('./index');
var usersRouter = require('./users');



app.use('/users', usersRouter);

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});

module.exports = app