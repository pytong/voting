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
        // Poll.update({_id: id, {$inc : {choices.vote : 1}})

        // Poll.find({_id: id}, function(err, polls) {
        //     if(err) { callback(false); }

        //     var poll = polls[0];

        //     for(var i = 0; i < poll.choices.length; i++) {
        //         console.log(poll.choices[i][0] === vote);
        //         if(poll.choices[i][0] === vote) {
        //             poll.choices[i][1]++;
        //             poll.save(function (err) {
        //               if (err) { callback(false); }
        //             })
        //             callback(true);
        //         }
        //     }

        // });
    }

}