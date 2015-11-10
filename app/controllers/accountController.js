(function(app) {
    app.controller("AccountController", ["$scope", "UserService", "PollService", function($scope, UserService, PollService) {

        UserService.loginStatus().get(function(res) {
            if(res.status === false) {
                window.location.href = "#/signin";
            }
        });

        PollService.polls()
            .get({}, function(res) {
                $scope.polls = res.polls;
            });

        $scope.newPoll = function() {
             window.location.href = "#/newpoll";
        }

    }]);
})(app);