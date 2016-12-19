"use strict";

angular.module('app').directive('dashboardDirective', [function () {
    return {
        template: "<h1>Dashboard</h1>",
        controller: ('headcountController', ['$scope', 'headCountService', function($scope, headCountService) {

        }]),
        link: function(scope, iElement, attrs, ctrl) {
        }
    };
}]);