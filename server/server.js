var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
const db = require('./db/mongo');

db()

var corsOptions = {
    origin: "*",
    // origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    // "optionsSuccessStatus": 204
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'view')));


var indexRouts = require('./routes/index');
app.use('/', cors(corsOptions), indexRouts);

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(80, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})