app.controller("UserController", ["$scope", "UserService", function($scope, UserService) {

    $scope.signin = function(username, password) {
        var signin = UserService.signin(username, password);
        signin.get(
            function(res) { //success
                window.location.href = "#/account";
            },
            function(err) { //error
                $scope.error = "Incorrect email or password";
            }
        );
    }

}]);