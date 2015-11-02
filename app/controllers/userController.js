app.controller("UserController", ["$scope", "UserService", function($scope, UserService) {

    $scope.signin = function(username, password) {
        UserService.signin(username, password)
            .get(
                function(res) { //success
                    window.location.href = "#/account";
                },
                function(err) { //error
                    $scope.error = "Incorrect email or password";
                }
            );
    }

    $scope.signup = function(name, username, password) {
        UserService.signup(name, username, password)
            .save(
                function(res) { //success
                    window.location.href = "#/account";
                },
                function(err) { //error
                    $scope.error = "Failed to register.";
                }
            );
    }

}]);