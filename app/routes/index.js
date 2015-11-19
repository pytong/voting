'use strict';

var path = process.cwd(),
    pollUtil = require("../utils/pollUtil");



module.exports = function (app, passport) {

	app.use(function(req, res, next) {
		if(req.isAuthenticated()) {
			req.username = req.user.username ? req.user.username : req.user.twitter.username;
		}
		next();
	});

	app.post('/api/polls', function(req, res) {
		var query = req.query;

		if(query.vote) {
			pollUtil.addVote({_id: query.id}, query.vote, function(success) {
				res.json({success: success});
			});
		} else {
			if(!req.isAuthenticated()) {
				return res.json({success: false, message: "You are not authenticated."});
			}

			pollUtil.savePoll( req.username, query.question, query.choices.split(","), function(success) {
				res.json({success: success});
			});
		}
	});


	app.get('/api/polls', function(req, res) {
		var id = req.query.id,
			params = {};

		if(!req.isAuthenticated() && !id) {
			return res.json({success: false});
		}

		id ? params._id = id : params.username = req.username;

		pollUtil.getPolls(params, function(pollArray) {
			if(pollArray !== null) {
				res.json({success: true, polls: pollArray});
			} else {
				res.json({success: false});
			}
		});
	});

	app.delete('/api/polls', function(req, res) {
		var id = req.query.id,
			params;

		if(!req.isAuthenticated() || !id) {
			return res.json({success: false, message: "You are not authenticated."});
		}

		params = {_id: id, username: req.username};
		pollUtil.deletePoll(params, function(success) {
			res.json({success: success});
		});
	});

	app.get('/api/users/login_status', function(req, res) {
		var status = req.isAuthenticated();
		res.json({status: status});
	});

	app.get('/api/users/signin', passport.authenticate('local-signin'),
		function(req, res) {
			res.json({success: true});
		});

	app.post('/api/users/signup-submit', passport.authenticate('local-signup'),
		function(req, res) {
			res.json({success: true});
		});

	app.post('/api/users/logout', function (req, res) {
		req.logout();
		res.json({success: true});
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/#/signin' }),
		function(req, res) {
			res.redirect('/#/account');
		});

	app.get("*", function (req, res) {
		res.sendFile(path + '/public/index.html');
	});

};
