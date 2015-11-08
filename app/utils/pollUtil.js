var Poll = require('../models/polls');

module.exports = {
    savePoll: function(question, choices, callback) {
        var poll = new Poll();

        poll.question = question;

        poll.choices = [];
        choices.forEach(function(choice) {
           poll.choices.push([choice, 0]);
        });

        poll.save(function(err) {
           if(err) { callback(false); }

           callback(true);
        });
    },

    getPolls: function(params, callback) {
        var pollArray = [];

        Poll.find(params, function(err, polls) {
            polls.forEach(function(poll) {
                pollArray.push({question: poll.question, choices: poll.choices});
            });
            callback(pollArray);
        });
    }
}