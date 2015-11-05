(function(app) {
   app.service("PollService", ["$resource", "$location", function($resource, $location) {
       var appUrl = $location.protocol() + "://" + $location.host();

       this.createPoll = function() {
           return $resource(appUrl + "/api/polls");
       }

   }]);
});