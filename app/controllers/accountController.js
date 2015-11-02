(function(app) {
    app.controller("AccountController", ["$scope", "UserService", function($scope, UserService) {

        $scope.logout = function() {
            var logout = UserService.logout();
            logout.get(
                function(res) { // success
                    window.location.href = "/#/signin";
                }
            );
        }

    }]);
})(app);