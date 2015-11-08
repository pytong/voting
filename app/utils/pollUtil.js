var Poll = require('../models/polls');

module.exports = {
    savePoll: function(question, choices, callback) {
        var poll = new Poll();

        poll.question = question.trim();

        poll.choices = {};
        choices.forEach(function(choice) {
            choice = choice.trim();
            poll.choices[choice] = 0;
        });

        poll.save(function(err) {
           if(err) { callback(false); }

           callback(true);
        });
    },

    getPolls: function(params, callback) {
        var pollArray = [];

        Poll.find(params, function(err, polls) {
            if(err) { callback(null); }

            polls.forEach(function(poll) {
                pollArray.push({question: poll.question, choices: poll.choices, id: poll.id});
            });
            callback(pollArray);
        });
    },

    addVote: function(id, vote, callback) {
        Poll.findOne({_id: id}, function(err, poll) {
            if(err) { callback(false); }

            poll.choices[vote] += 1;
            poll.markModified("choices");

            poll.save(function (err) {
                if (err) { callback(false); }
                callback(true);
            });

        });
    }

}