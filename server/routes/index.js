const express = require('express');
const app = express();
const appRouts = require('./routes');
const path = require('path');


app.use('/api', appRouts);

app.use('/public',
  function (req, res) {
    res.sendFile(path.join(__dirname, "../../public" + req.url));
  });

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, '../../view/index.html'));
});


module.exports = app;
