(function(app) {
    app.controller("PollController", ["$scope", function($scope) {

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
    }]);
})(app);