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
        template: '<h1>{{title}}</h1><div ng-model=\"value\"><places-map  address=\"initAddress\"></places-map></div>',
        controller: ('locationsCtrl', ['$scope', 'customerVisitsService', function ($scope) {

            $scope.title = "Venue Location";

            $scope.initAddress = {
                place_id : "ChIJ31GTk67GhkcRPw6Nl8LeRdQ",
                geometry : {
                    location : {
                        A : 45.464679,
                        F : 9.190770100000009
                    }
                },
                zoom: 20
            };

        }]),
        link: function (scope, iElement, attrs, ctrl) {

        }
    }
}]);
