(function(app) {
    app.controller("VoteController", ["$scope", "$routeParams", "PollService", function($scope, $routeParams, PollService) {
        $scope.id = $routeParams.id;

        PollService.polls()
            .get({"id": $scope.id},
                function(res) {
                    $scope.question = res.polls[0].question;
                    $scope.choices = Object.keys(res.polls[0].choices);
                }
            );

    $scope.vote = function() {
        PollService.polls()
            .save({"id": $scope.id, "vote": $scope.choiceSelected},
                function(res) {
                    window.location.href = "#/polls/stats/" + $scope.id;
                }
            );
        }

    }]);
})(app);