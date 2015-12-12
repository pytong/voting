'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();


require('dotenv').load(); // Only required for running locally
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static('app/controllers'));
app.use('/services', express.static('app/services'));
app.use('/views', express.static('app/views'));
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('app'));

// app.use(session({
// 	secret: 'greentrees',
// 	resave: false,
// 	saveUninitialized: true
// }));

app.use(session({
    store: new FileStore({logFn: function(){}}),
    secret: 'greentrees'
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});