(function(app) {
    app.controller("PollController", ["$scope", "PollService", function($scope, PollService) {

        $scope.choices = [{"id": "choice1"}, {"id": "choice2"}];

        $scope.addChoice = function() {
            if($(".choice").last().val() === "") { return; }

            var newItemNo = $scope.choices.length + 1;
            $scope.choices.push({"id": "choice" + newItemNo});
        }

        $scope.removeChoice = function() {
            if($scope.choices.length < 3) { return; }

            var lastItem = $scope.choices.length - 1;
            $scope.choices.splice(lastItem);
        }

        $scope.createPoll = function(question, choices) {
            console.log(question, choices);
            PollService.createPoll(question, choices)
                .save(
                    function(res) { //success
                        //window.location.href = "#/account";
                    },
                    function(err) { //error
                      // $scope.error = "Failed to register.";
                    }
                );
        }

    }]);
})(app);