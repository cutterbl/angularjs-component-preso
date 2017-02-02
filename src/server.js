'use strict';

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
//var path     = require('path');
//var mongoose = require('mongoose');                     // mongoose for mongodb
var favicon = require('serve-favicon');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');
// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/web', {
    maxAge: 0,
    dotfiles: 'deny',
    index: 'index.html',
    setHeaders: function (res) {
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.setHeader('Expires', '-1');
        res.setHeader('Pragma', 'no-cache');
    }
}));                 // set the static files location /public/img will be /img for users
app.use(favicon(__dirname + '/web/resources/images/favicon.ico'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');
