"use strict";

angular.module("menu").directive("menuItem", function () {
    return {
        require: '^menu',
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },        
        templateUrl: "menu/menuItem.html",
        link: function (scope, el, attr, ctrl) {

            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function () {
                return ctrl.isVertical();
            };

            el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    };
});