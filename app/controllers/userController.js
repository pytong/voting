app.controller("UserController", ["$scope", "$location", "UserService", function($scope, $location, UserService) {

    var profile = UserService.profile();
    profile.get(function(user) {
        $scope.username = user.username;
        $scope.name = user.name;
    });

}]);