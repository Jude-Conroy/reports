"use strict";

angular.module('app').directive( 'dashboardDirective',[function () {
    return {
        restrict: 'EA',
        templateUrl: "dashboard/dashboard.html",
        controller: function(){  },
        link: function(scope, iElement, attrs, ctrl, $rootScope) {

            scope.dashboardTitle = "Enter Venue Id ac:86:74:0b:c7:08";

            scope.changeVenueId = function() {
                $rootScope.venueid  = scope.venueId;
            };
        }
    };
}]);