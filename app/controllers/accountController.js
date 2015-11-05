(function(app) {
    app.controller("AccountController", ["$scope", "UserService", function($scope, UserService) {

        $scope.showNewPoll = false;

        $scope.newPoll = function() {
            $scope.showNewPoll = true;
        }

    }]);
})(app);