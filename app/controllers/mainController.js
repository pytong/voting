app.controller("MainController", ["$scope", "$location", "UserService", function($scope, $location, UserService) {


    var loginStatus = UserService.loginStatus();

    // loginStatus.get(function(res) {
    //     if(res.status === false) {
    //         window.location.href = "#/signin";
    //     }
    // });


}]);