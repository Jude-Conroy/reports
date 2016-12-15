"use strict";

angular.module('menu').directive('menuGroup', function () {
    return {
        require: '^menu',
        transclude: true,
        scope: {
            label: '@', icon: '@'
        },
        templateUrl: 'menu/menuGroup.html',
        link: function (scope, el, attr, ctrl) {
            scope.isOpen = false;
            scope.closeMenu = function () {
                scope.isOpen = false;
            };

            scope.isVertical = function () {
                return ctrl.isVertical();
            };

            scope.clicked = function () {
                scope.isOpen = !scope.isOpen;
            }
        }
    };
});