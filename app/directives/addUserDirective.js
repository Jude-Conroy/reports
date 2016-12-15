/**
 * Created by Jude on 15/12/2016.
 */
"use strict";

var module = angular.module('app');

module.directive('userDirective', function () {
    return {
        restrict: 'EA',
        scope: {
            model: '=ngModel',
            name: '@',
            email: '@'
        },
        templateUrl: 'graphs/addUser.html',
        controller: ('userController', ['$scope', 'userService', function ($scope, customerVisitsService) {


        }]),
        link: function (scope, iElement, attrs, ctrl) {

        }
    };
});

module.directive('showErrors', function() {
    return {
        restrict: 'A',
        require: '^form',
        link: function (scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEl   = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box
            var inputName = inputNgEl.attr('name');

            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function() {
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            })
        }
    }
});

module.controller('NewUserController', function($scope) {
    $scope.save = function() {
        if ($scope.userForm.$valid) {
            alert('User saved');
            $scope.reset();
        } else {
            alert("There are invalid fields");
        }
    };

    $scope.reset = function() {
        $scope.user = { name: '', email: '' };
    }
});

