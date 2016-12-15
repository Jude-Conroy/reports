"use strict";

angular.module("framework").directive("framework", function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        controller: "frameworkController",
        templateUrl: "frameworkCore/frameworkTemplate.html"
    };
});
