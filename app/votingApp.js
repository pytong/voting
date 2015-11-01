var app = angular.module("VotingApp", ["ngResource", "ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        controller: "MainController",
        templateUrl: "/views/main.html"
    })
    .when("/signin", {
        controller: "UserController",
        templateUrl: "/views/signin.html"
    })
    .when("/signup", {
        controller: "UserController",
        templateUrl: "/views/signup.html"
    })
    .when("/account", {
        controller: "AccountController",
        templateUrl: "/views/account.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});