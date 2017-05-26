"use strict";

angular.module('app').directive('customerVisitsDirective', ['customerVisitsService' ,function (customerVisitsService) {
    return {
        templateUrl: 'graphs/customerVisit.html',
        controller: ('customerVisitsController', function ($scope, $rootScope)
        {
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };

            var initialDate = new Date();

            $scope.selected = {
                date: initialDate.getDate()  + "/" + (initialDate.getMonth() + 1) + "/" + initialDate.getFullYear()
            };

            $scope.title = "Visit Duration";

            $scope.changeVisitDate = function () {

                customerVisitsService.visits(moment($scope.date).format('DD/MM/YYYY'), $rootScope.venueid).then(function (response) {

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
                        $scope.data = [];
                    }else if(  Object.prototype.toString.call(response.data) == "[object Array]"){
                        $.notify({
                            title: '<strong>Report: </strong>',
                            message: "Visit duration report <strong>successful</strong>"
                        },{
                            type: 'success'
                        },{animate: {
                            enter: 'animated fadeInRight',
                            exit: 'animated fadeOutRight'
                        }});
                        $scope.labels = response.data[0];
                        $scope.data = response.data[1];
                    }
                });
            }
        }),
        link: function ($scope, iElement, attrs, ctrl) {

        }
    }
}]);