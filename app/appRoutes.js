"use strict";

angular.module('app')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
        .when("/HeadCountView", {
            template : "<headcount-directive></headcount-directive>"
        })
        .when("/AddUserView", {
            template : "<user-directive></user-directive>"
        })
        .when("/ServiceDayView", {
            template : "<service-day-directive></service-day-directive>"
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

}]).run(function($rootScope) {
    $rootScope.venueid = location.search.split("&")[0].replace("?","").split("=")[1];
});