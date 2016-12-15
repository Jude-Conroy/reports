"use strict";

angular.module("menu").directive("menu", function () {
    return {
        scope: {

        },
        transclude: true,
        templateUrl: 'menu/menu.html',
        controller: 'menuController',
        link: function (scope, el, attr) {

        }
    };
});