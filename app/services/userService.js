app.service("UserService", ["$resource", "$location", function($resource, $location) {
    var appUrl = $location.protocol() + "://" + $location.host();

    this.getUser = function() {
        return $resource(appUrl + "/users/:username", {username: "@username"});
    }

}]);