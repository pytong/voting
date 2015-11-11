(function(app) {
    app.controller("PollController", ["$scope", "UserService", "PollService", function($scope, UserService, PollService) {

        UserService.loginStatus().get(function(res) {
            if(res.status === false) {
                window.location.href = "#/signin";
            }
        });

        $scope.poll = {};
        $scope.uniqueChoices = false;
        $scope.poll.choices = [{"id": "choice1"}, {"id": "choice2"}];

        $scope.addChoice = function() {
            if($(".choice-field").last().val() === "") { return; }

            var newItemNo = $scope.poll.choices.length + 1;
            $scope.poll.choices.push({"id": "choice" + newItemNo});
        }

        $scope.removeChoice = function() {
            if($scope.poll.choices.length < 3) { return; }

            var lastItem = $scope.poll.choices.length - 1;
            $scope.poll.choices.splice(lastItem);
        }

        $scope.createPoll = function() {
            var question = $scope.poll.question,
                choices = $.map($scope.poll.choices, function(choiceObj) {
                    return choiceObj.name;
                });

            PollService.polls()
                .save({'question': question, 'choices': choices},
                    function(res) {
                        window.location.href = "#/account";
                    }
                );
        }

        $scope.validateUniqueChoices = function() {
            var choices = $.map($scope.poll.choices, function(choiceObj) {
                return choiceObj.name;
            });

            if(choices.length === $.unique(choices).length) {
                $scope.uniqueChoices = true;
            } else {
                $scope.uniqueChoices = false;
            }
        }

    }]);
})(app);