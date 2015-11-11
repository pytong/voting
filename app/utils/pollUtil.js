var Poll = require('../models/polls');

module.exports = {
    savePoll: function(username, question, choices, callback) {
        var poll = new Poll();

        poll.username = username;
        poll.question = question.trim();

        poll.choices = {};
        choices.forEach(function(choice) {
            choice = choice.trim();
            poll.choices[choice] = 0;
        });

        poll.save(function(err) {
           if(err) { return callback(false); }

           callback(true);
        });
    },

    getPolls: function(params, callback) {
        var pollArray = [];

        Poll.find(params, function(err, polls) {
            if(err) { return callback(null); }

            polls.forEach(function(poll) {
                pollArray.push({question: poll.question, choices: poll.choices, id: poll.id});
            });
            callback(pollArray);
        });
    },

    addVote: function(params, vote, callback) {
        Poll.findOne(params, function(err, poll) {
            if(err) { return callback(false); }

            poll.choices[vote] += 1;
            poll.markModified("choices");

            poll.save(function (err) {
                if (err) { return callback(false); }
                callback(true);
            });

        });
    },

    deletePoll: function(params, callback) {
        Poll.remove(params, function(err) {
            if(err) { return callback(false); }

            callback(true);
        });
    }

}