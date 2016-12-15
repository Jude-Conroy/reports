/**
 * Created by jude on 25/11/2016.
 */
"use strict";

angular.module('app').factory("customerVisitsService", function($http) {

    var factory = {};

    factory.visits = function (date) {

        var dateSplit =  date.split("/");

        var data = {
            queryDate: dateSplit[2]+ "-" + dateSplit[1] + "-" + dateSplit[0],
            venueid:"ac:86:74:0b:c7:08"
        };

        var config = {
            params: data,
            headers: {'Accept': 'application/json'}
        };

        return $http.get("/customerVisitsReport", config);
    };
    return factory;
});

angular.module('app').factory("serviceDayService", function($http) {

    var factory = {};

    factory.day = function(date, reportType) {

        var dateSplit =  date.split("/");

        var data = {
            queryDateRange: dateSplit[2]+ "-" + dateSplit[1] + "-" + dateSplit[0],
            reportType: reportType,
            venueid:"ac:86:74:0b:c7:08"
        };

        var config = {
            params: data,
            headers : {'Accept' : 'application/json'}
        };

        return $http.get("/serviceDayReport" , config);
    };

    return factory;
});

angular.module('app').factory("headCountService", function($http) {

    var factory = {};

    factory.head = function (query) {

        var dateSplit =  query.split("/");

        var data = {
            queryDate: dateSplit[2]+ "-" + dateSplit[1] + "-" + dateSplit[0],
            venueid: "ac:86:74:0b:c7:08"
        };

        var config = {
            params: data,
            headers: {'Accept': 'application/json'}
        };

        return $http.get("/headCountReport", config);
    };
    return factory;
});