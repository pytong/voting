(function(app) {
    app.controller("PollController", ["$scope", function($scope) {

        $scope.choices = [];

        $scope.addChoice = function() {
            var newItemNo = $scope.choices.length + 1;
            $scope.choices.push({"id": "choice" + newItemNo});
        }

        $scope.removeChoice = function() {
            var lastItem = $scope.choices.length - 1;
            $scope.choices.splice(lastItem);
        }
    }]);
})(app);