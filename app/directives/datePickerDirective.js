/**
 * Created by Jude on 07/02/2017.
 */
/*
var app = angular.module('app');

app.directive('datetimepicker', function(){
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ngModel){

            if(!ngModel) return; // do nothing if no ng-model

            ngModel.$render = function(){
                element.find('input').val( ngModel.$viewValue || '' );
            }

            element.datetimepicker({
                language: 'en-gb'
            });

            element.on('dp.change', function(){
                scope.$apply(read);
            });

            read();

            function read() {
                var value = element.find('input').val();
                ngModel.$setViewValue(value);
            }
        }
    }
});

app.controller('IndexController', function($scope){
    $scope.date = moment();
});
*/