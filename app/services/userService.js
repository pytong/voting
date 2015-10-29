app.service("UserService", ["$resource", "$location", function($resource, $location) {
    var apiUrl = $location.protocol() + "://" + $location.host();

    return $resource(apiUrl + "/users/:user", {user: "@user"});
}]);