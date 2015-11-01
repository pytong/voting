app.controller("UserController", ["$scope", "UserService", function($scope, UserService) {

    $scope.signin = function(username, password) {
        var signin = UserService.signin(username, password);
        signin.get(function(res) {

            // check signin success
            console.log(res);
        });
    }

}]);