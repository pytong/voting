(function(app) {
    app.controller("VoteController", ["$scope", "$routeParams", "PollService", function($scope, $routeParams, PollService) {
        $scope.question = $routeParams.question;

        PollService.polls()
            .get({'question': $scope.question},
                function(res) {
                    $scope.choices = res.polls[0].choices.map(function(choice) {
                        return choice[0];
                    });
                }
            );


    }]);
})(app);