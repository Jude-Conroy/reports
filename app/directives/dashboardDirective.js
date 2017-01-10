"use strict";

angular.module('app').directive('dashboardDirective', function () {
    return {
        restrict: 'EA',
        scope: {
            model: '=ngModel'
        },
        templateUrl: "dashboard/dashboard.html",
        controller: ('dashboardController', ['$scope', 'VenueService', function($scope, VenueService) {

            $scope.title = "Enter Venue Id ac:86:74:0b:c7:08";

            $scope.changeVenueId = function() {
                VenueService.setVenueId($scope.venueId);
            };
        }]),
        link: function(scope, iElement, attrs, ctrl) {
        }
    };
});