(function(app) {
    app.controller("NavigationBarController", ["$scope", "UserService", function($scope, UserService) {

        $scope.showSignInLink = false;
        $scope.showRegisterLink = false;
        $scope.showLogoutLink = false;

        UserService.loginStatus().get(function(res) {
            if(res.status === true) {
                $scope.showLogoutLink = true;
            } else {
                $scope.showSignInLink = true;
                $scope.showRegisterLink = true;
            }
        });

        $scope.logout = function() {
            UserService.logout().save(function(res) {
                if(res.success === true) {
                    window.location.href = "/";
                }
            });
        }

    }]);
})(app);