var app = angular.module("VotingApp", ["ngResource", "ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        controller: "MainController",
        templateUrl: "/views/main.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});