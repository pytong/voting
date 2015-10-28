app.service("userService", ["$http", "$location", function($http, $location) {
    var apiUrl = $location.protocol() + "://" + $location.host();

    this.save = function(user) {
        return $http.post(apiUrl + "/user")
            .success(function(data) {

            })
            .error(function(data) {

            });
    }


}]);