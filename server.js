'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
// var localPassport = require('passport');
var twitterPassport = require('passport');
var session = require('express-session');


// require('./app/config/localPassport')(localPassport);
require('./app/config/twitterPassport')(twitterPassport);
var app = express();
require('dotenv').load();


mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/services', express.static(process.cwd() + '/app/services'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/', express.static(process.cwd() + '/app'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

// app.use(localPassport.initialize());
// app.use(localPassport.session());

app.use(twitterPassport.initialize());
app.use(twitterPassport.session());

routes(app, twitterPassport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});