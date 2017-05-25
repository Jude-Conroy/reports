"use strict";

angular.module('app').directive( 'dashboardDirective', '$scope',[function ($scope) {
    return {
        restrict: 'EA',
        templateUrl: "dashboard/dashboard.html",
        controller: function(){  },
        link: function(scope, iElement, attrs, ctrl, $scope) {

            scope.dashboardTitle = "Enter Venue Id ac:86:74:0b:c7:08";

            scope.changeVenueId = function() {
                $scope.venueid  = scope.venueId;
            };
        }
    };
}]);