"use strict";

angular.module("framework").controller("frameworkController",
    ['$scope', '$window', '$timeout', '$rootScope', '$location',
        function ($scope, $window, $timeout, $rootScope, $location) {

            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVertical = true;

            $scope.$on('menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;
                $location.path(data.route).replace();
                checkWidth();
                broadcastMenuState();
            });

            $scope.$on('menu-orientation-changed-event', function (evt, data) {
                $scope.isMenuVertical = data.isMenuVertical;
            });

            $($window).on('resize.framework', function () {
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState();
                });
            });

            $scope.$on("$destroy", function () {
                $($window).off("resize.framework"); // remove the handler added earlier
            });

            var checkWidth = function () {
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width >= 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                //$scope.$apply();
            };

            var broadcastMenuState = function () {
                $rootScope.$broadcast('menu-show',
                    {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.isMenuButtonVisible
                    });
            };

            $timeout(function () {
                checkWidth();
            }, 0);

        }
    ]);