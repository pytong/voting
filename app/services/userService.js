app.service("UserService", ["$resource", "$location", function($resource, $location) {
    var appUrl = $location.protocol() + "://" + $location.host();

    this.profile = function() {
        return $resource(appUrl + "/api/profile");
    }

    this.loginStatus = function() {
        return $resource(appUrl + "/api/login_status");
    }

    this.signin = function(username, password) {
        return $resource(appUrl + "/api/signin", {
            username: username,
            password : password
        });
    }


}]);