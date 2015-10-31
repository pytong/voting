'use strict';

var TwitterStrategy = require('passport-twitter').Strategy,
	LocalStrategy = require('passport-local').Strategy,
    TwitterUser = require('../models/twitterUsers'),
    bcrypt = require('bcrypt-nodejs'),
    User = require('../models/users'),
    configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		TwitterUser.findById(id, function (err, user) {
			if (err) { return done(err); }

			if(user) {
				done(err, user);
			} else {
				User.findById(id, function(err, user) {
					if(err) { return done(err); }
					done(err, user);
				});
			}
		});
	});

	passport.use('twitter', new TwitterStrategy({
			consumerKey: configAuth.twitterAuth.consumerKey,
			consumerSecret: configAuth.twitterAuth.consumerSecret,
			callbackURL: configAuth.twitterAuth.callbackURL
		},
		function(token, tokenSecret, profile, done) {
			TwitterUser.findOne({ 'twitter.id': profile.id }, function (err, user) {
				if (err) { return done(err); }

				if (user) {
					return done(null, user);
				} else {
					var newUser = new TwitterUser();

					newUser.twitter.id = profile.id;
					newUser.twitter.username = profile.username;
					newUser.twitter.name = profile.displayName;

					newUser.save(function (err) {
						if (err) { return done(err); }

						return done(null, newUser);
					});
				}
			});
		}
	));
	
	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passReqToCallback: true
		},
		function(req, email, password, done) {
			var newUser = new User();
			newUser.name = req.body.name;
			newUser.username = email;
			newUser.password = bcrypt.hashSync(passport);

			newUser.save(function (err) {
				if (err) { return done(err); }

				return done(null, newUser);
			});
		}
	));

    passport.use('local-signin', new LocalStrategy({
			usernameField: 'email'
		},
	    function(username, password, done) {
	        User.findOne({ username: username }, function(err, user) {
		        if (err) { return done(err); }

		        if (!user) {
		            return done(null, false);
		        }
		        if (bcrypt.compareSync(user.password, bcrypt.hashSync(password)) === true) {
		            return done(null, false);
		        }
		        return done(null, user);
		    });
	    }
	));
};
