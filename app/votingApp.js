var app = angular.module("VotingApp", ["ngResource", "ngRoute"]);

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
    .when("/polls/vote/:id", {
        controller: "VoteController",
        templateUrl: "/views/vote.html"
    })
    .when("/polls/stats/:id", {
        templateUrl: "/views/voteStats.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});