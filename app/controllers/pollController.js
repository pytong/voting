(function(app) {
    app.controller("PollController", ["$scope", "PollService", function($scope, PollService) {

        $scope.poll = {};
        $scope.poll.choices = [{"id": "choice1"}, {"id": "choice2"}];

        $scope.backToAccount = function() {
             window.location.href = "#/account";
        }

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

        $scope.createPoll = function(question, choiceObjs) {
            var choices = $.map(choiceObjs, function(choiceObj) {
                return choiceObj.name;
            });

            PollService.polls()
                .save({'question': question, 'choices': choices},
                    function(res) {
                        //window.location.href = "#/account";
                    }
                );
        }

    }]);
})(app);