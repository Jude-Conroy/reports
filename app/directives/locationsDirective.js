/**
 * Created by jude on 25/11/2016.
 */
"use strict";

angular.module('app').directive('locations', [function () {
    return {
        scope: {
            model: '=ngModel',
            initAddress: '@',
            title: '@'
        },
        template: '<div class=\"headingText\">{{title}}</div><div ng-model=\"value\"><places-map  address=\"initAddress\"></places-map></div>',
        controller: ('locationsCtrl', ['$scope', 'customerVisitsService', function ($scope) {

            $scope.title = "Venue Location";

            $scope.initAddress = {
                place_id : "!4m5!3m4!1s0x48760f407b3ded85:0x3bdf476deb47f23e!8m2!3d",
                geometry : {
                    location : {
                        A : 51.4496363,
                        F : -0.2104816
                    }
                },
                zoom: 18
            };

        }]),
        link: function (scope, iElement, attrs, ctrl) {

        }
    }
}]);
