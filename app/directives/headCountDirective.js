"use strict";

angular.module('app').directive('headcountDirective', [function () {
    return {
        templateUrl: 'graphs/headCount.html',
        controller: ('headcountController', ['$scope', 'headCountService', function($scope, headCountService) {

            $('#headcountpicker').datetimepicker({
                viewMode: 'days',
                format: 'DD/MM/YYYY'
            });

            var initialDate = new Date();
            $scope.selected = {
                date: initialDate.getDate()  + "/" + (initialDate.getMonth() + 1) + "/" + initialDate.getFullYear()
            };

            $scope.title = "Headcount/Hour";

            $scope.changeVisitDate = function(){
                $scope.labels = [];
                $scope.series = [];
                $scope.data =  [];

                var selectedDate = $('#inputQueryDate').val();

                headCountService.head(selectedDate).then(function(response) {

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
        }]),
        link: function(scope, iElement, attrs, ctrl) {
        }
    };
}]);