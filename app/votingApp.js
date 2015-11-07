var app = angular.module("VotingApp", ["ngResource", "ngRoute", "angular.filter"]);

app.config(function($locationProvider, $routeProvider) {

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
    .when("/newpoll", {
        controller: "PollController",
        templateUrl: "/views/newPoll.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});