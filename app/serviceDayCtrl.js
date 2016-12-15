/**
 * Created by jude on 01/12/2016.
 */
"use strict";

angular.module("app").controller("serviceDayCtrl", ["$scope", "serviceDayService", function ($scope, serviceDayService) {

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
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

    $scope.names = ["7 Days", "4 Weeks", "6 Months"];
    $scope.title = "Service Day";

    $('#serviceDayPicker').datetimepicker({
        viewMode: 'days',
        format: 'DD/MM/YYYY'
    });

    $scope.changeDate = function() {

        $scope.data = null;
        $scope.labels = null;
        $scope.series = null;

        var selectedDate = $("#selectedDate").val();

        serviceDayService.day(selectedDate, $scope.selected.range).then(function(response) {

            if( typeof response.data === 'string' ) {
                $.notify({
                    title: '<strong>Report: </strong>',
                    message: response.data
                },{
                    type: 'danger'
                },{animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutRight'
                }})
            }else if(  Object.prototype.toString.call(response.data) == "[object Array]"){
                $.notify({
                    title: '<strong>Report: </strong>',
                    message: $scope.selected.range + " report <strong>successful</strong>"
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
    };
}]);
