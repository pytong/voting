'use strict';

var path = process.cwd(),
    pollUtil = require("../utils/pollUtil");



module.exports = function (app, passport) {

	app.route ('/api/polls')
		.post(function(req, res) {
			var query = req.query;
			pollUtil.savePoll(query.question, query.choices.split(","), function(success) {
				res.json({success: success});
			});
		});

	app.route('/api/polls')
		.get(function(req, res) {
			var polls = pollUtil.getPolls(function(pollArray) {
				res.json({success: true, polls: pollArray});
			});
		});

	app.route('/api/users/login_status')
		.get(function(req, res) {
			var status = req.isAuthenticated();
			res.json({status: status});
		});

	app.route('/api/users/signin')
		.get(
			passport.authenticate('local-signin'),
			function(req, res) {
				res.json({success: true});
			});

	app.route('/api/users/signup-submit')
		.post(passport.authenticate('local-signup'),
			function(req, res) {
				res.json({success: true});
			});

	app.route('/api/users/logout')
		.post(function (req, res) {
			req.logout();
			res.json({success: true});
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', { failureRedirect: '/#/signin' }),
			function(req, res) {
				res.redirect('/#/account');
		});

	app.route("*")
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

};
