(function(app) {
    app.controller("NavigationBarController", ["$scope", "UserService", function($scope, UserService) {

        $scope.logout = function() {
            UserService.logout().save(function(res) {
                if(res.success === true) {
                    window.location.href = "/";
                }
            });
        }

    }]);
})(app);