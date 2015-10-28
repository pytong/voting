app.controller("VotingController", ["$scope", "$location", "userService", function($scope, $location, userService) {
  $scope.register = function(user) {
    $scope.user = angular.copy(user);

    userService.save($scope.user).success(function(data) {

    });
  };

}]);
