/**
 * Created by Jude on 15/12/2016.
 */
"use strict";

var module = angular.module('app');

module.directive('userDirective', function () {
    return {
        scope: {
            model: '=ngModel',
            name: '@',
            email: '@'
        },
        templateUrl: 'graphs/addUser.html',
        controller: ('userController', ['$scope', 'userService', function ($scope, userService) {

            $scope.user = {
                name: '',
                email: '',
                venueId: '',
            };

            $scope.save = function() {
                if ($scope.userForm.$valid) {

                    userService.save($scope.user).then(function (response) {
                        $.notify({
                            title: '<strong>Saved: </strong>',
                            message: response.data
                        }, {
                            type: 'success'
                        }, {
                            animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            }
                        })
                    });
                    $scope.reset();
                } else {

                    $.notify({
                        title: '<strong>Failed: </strong>',
                        message: "invalid fields, please check."
                    },{
                        type: 'warning'
                    },{animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                    }
                    });
                }
            };

            $scope.reset = function() {
                $scope.user = { name: '', email: '' };
            }
        }])};
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
            $.notify({
                title: '<strong>Report: </strong>',
                message: "There are invalid fields. "
            },{
                type: 'danger'
            },{animate: {
                enter: 'animated fadeInRight',
                exit: 'animated fadeOutRight'
            }
            });
        }
    };

    $scope.reset = function() {
        $scope.user = { name: '', email: '' };
    }
});

