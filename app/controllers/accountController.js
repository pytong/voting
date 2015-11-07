(function(app) {
    app.controller("AccountController", ["$scope", "PollService", function($scope, PollService) {

        PollService.polls()
            .get({}, function(res) {
                $scope.polls = res.polls;
            });

        $scope.newPoll = function() {
             window.location.href = "#/newpoll";
        }

    }]);
})(app);