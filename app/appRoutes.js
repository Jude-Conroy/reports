"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/HeadCountView", {
            template : "<headcount-directive></headcount-directive>"
        })
        .when("/AddUserView", {
            template : "<user-directive></user-directive>"
        })
        .when("/ServiceDayView", {
            templateUrl : "graphs/serviceDay.html",
            controller: "serviceDayCtrl"
        })
        .when("/CustomerVisitView", {
            template : "<customer-visits-directive></customer-visits-directive>"
        })
        .when("/LocationView", {
            template : "<locations></locations>"
        })
        .when("/DashboardView", {
            template : "<dashboard-directive></dashboard-directive>"
        })
        .otherwise({ redirectTo: '/' });

}]);