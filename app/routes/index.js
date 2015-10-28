'use strict';

var path = process.cwd();

module.exports = function (app, twitterPassport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});

	// app.route('/users')
	// 	.get(localPassport.authenticate('local', {
	// 		successRedirect: '/',
 //           failureRedirect: '/login'
	// 	}));

	app.route('/auth/twitter')
		.get(twitterPassport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(twitterPassport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
};
