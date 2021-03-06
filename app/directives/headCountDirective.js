"use strict";

angular.module('app').directive('headcountDirective', [ 'headCountService', function (headCountService) {
    return {
        restrict: 'EA',
        templateUrl: 'graphs/headCount.html',
        controller: ('headcountController', function($scope, $rootScope) {

            var initialDate = new Date();
            $scope.selected = {
                date: initialDate.getDate()  + "/" + (initialDate.getMonth() + 1) + "/" + initialDate.getFullYear()
            };

            $scope.headTitle = "Headcount per hour";

            $('#datetimepicker6').datepicker(
                {
                    viewMode: 'days',
                    format: 'DD/MM/YYYY'
                }
            );

            $scope.changeVisitDate = function(){
                $scope.labels = [];
                $scope.series = [];
                $scope.data =  [];

                headCountService.head(moment($scope.date).format('DD/MM/YYYY'), $rootScope.venueid).then(function(response) {

                    if( typeof response.data === 'string' ) {
                        $.notify({
                            title: '<strong>Report: </strong>',
                            message: response.data
                        },{
                            type: 'danger'
                        },{animate: {
                            enter: 'animated fadeInRight',
                            exit: 'animated fadeOutRight'
                        }
                        });
                        $scope.labels = [];
                        $scope.series = [];
                        $scope.data = [];
                    }else if(  Object.prototype.toString.call(response.data) == "[object Array]"){
                        $.notify({
                            title: '<strong>Report: </strong>',
                            message: "Headcount report <strong>successful</strong>"
                        },{
                            type: 'success'
                        },{animate: {
                            enter: 'animated fadeInRight',
                            exit: 'animated fadeOutRight'
                        }});
                        $scope.labels = response.data[0];
                        $scope.series = response.data[1];
                        $scope.data = response.data[2];
                    }
                });
            }
        }),
        link: function(scope, iElement, attrs, ctrl) {
        }
    };
}]);