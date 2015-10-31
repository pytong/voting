'use strict';

var path = process.cwd();
var ejs = require('ejs');
var fs = require('fs');


module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/signin');
		}
	}

	function isNotLoggedIn(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/profile')
		.get(function(req, res) {
			var user = (req.user.twitter ? req.user.twitter : req.user);
			res.json(user);
		});

	app.route('/signin')
		.get(isNotLoggedIn, function (req, res) {
			var templateString = fs.readFileSync(path + '/public/signin.html', 'utf-8');
			res.end(ejs.render(templateString, { error: req.flash("error")[0] }));
		});

	app.route('/signup')
		.get(function (req, res) {
			res.sendFile(path + '/public/signup.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/signin');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	app.route('/signup-submit')
		.post(passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup'
		}));

	app.route('/signin-submit')
		.post(passport.authenticate('local-signin', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: 'Invalid username or password.'
		}));

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/signin'
		}));
};
