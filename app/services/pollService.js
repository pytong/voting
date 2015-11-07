(function(app) {
    app.service("PollService", ["$resource", "$location", function($resource, $location) {
        var appUrl = $location.protocol() + "://" + $location.host();

        this.polls = function() {
            return $resource(appUrl + "/api/polls?question=:question&choices=:choices", {question: "@question", choices: "@choices"});
        }

    }]);
})(app);