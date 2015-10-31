app.service("UserService", ["$resource", "$location", function($resource, $location) {
    var appUrl = $location.protocol() + "://" + $location.host();

    this.profile = function() {
        return $resource(appUrl + "/api/profile");
    }

}]);