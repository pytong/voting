(function(app) {
    app.service("PollService", ["$resource", "$location", function($resource, $location) {
        var appUrl = $location.protocol() + "://" + $location.host();

        this.polls = function() {
            return $resource(appUrl + "/api/polls?id=:id&question=:question&choices=:choices&vote=:vote", {id: "@id", question: "@question", choices: "@choices", vote: "@vote"});
        }

    }]);
})(app);