var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
var http = require('http');
var io = require('socket.io')(http);


io.on('connection',socket=>console.log(socket));

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());



app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);










var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on localhost:" + port);
