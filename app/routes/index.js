'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/signin');
		}
	}

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/signin')
		.get(function (req, res) {
			res.sendFile(path + '/public/signin.html');
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

	app.route('/signup')
		.post(passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/signup'
		}));

	app.route('/signin')
		.post(passport.authenticate('local-signin', {
			successRedirect: '/',
			failureRedirect: '/signin'
		}));

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/signin'
		}));
};
