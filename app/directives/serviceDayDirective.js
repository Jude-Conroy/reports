"use strict";

angular.module('app').directive('serviceDayDirective', ['serviceDayService', function (serviceDayService) {
    return {
        controller: function ($scope, $rootScope) {

            $scope.names = ["7 Days", "4 Weeks", "6 Months"];
            $scope.title = "Service Day";

            $scope.changeDate = function(selected) {

                $.notify({
                        title: '<strong>Report: </strong>',
                        message: "request submitted"
                    },{
                        type: 'info'
                    },{animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                    }}
                )

                $scope.data = null;
                $scope.labels = null;
                $scope.series = null;

                serviceDayService.day(moment($scope.date).format('DD/MM/YYYY'), selected.range, $rootScope.venueid).then(function(response) {

                    if( typeof response.data === 'string' ) {
                        $.notify({
                            title: '<strong>Report: </strong>',
                            message: response.data
                        },{
                            type: 'warning'
                        },{animate: {
                            enter: 'animated fadeInRight',
                            exit: 'animated fadeOutRight'
                        }})
                    }else if(  Object.prototype.toString.call(response.data) == "[object Array]"){
                        $.notify({
                            title: '<strong>Report: </strong>',
                            message: $scope.selected.range + " <strong>successful</strong>"
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
        },
        templateUrl: 'graphs/serviceDay.html'
    };
}]);

angular.module('app').controller('controller', function ($scope) {
    $scope.moment = moment;
    $scope.date = new Date();
    $scope.formattedDate = new Date();
    $scope.addFifteen = function () {
        $scope.date = new Date($scope.date.getTime() + (15 * 60000));
    }
})

angular.module('app').directive('myDatePicker', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelController) {

                // Private variables
                var datepickerFormat = 'DD/MM/YYYY',
                    momentFormat = 'DD/MM/YYYY',
                    datepicker,
                    elPicker;

                // Init date picker and get objects http://bootstrap-datepicker.readthedocs.org/en/release/index.html
                datepicker = element.datepicker({
                    autoclose: true,
                    keyboardNavigation: false,
                    todayHighlight: true,
                    format: datepickerFormat
                });
                elPicker = datepicker.data('datepicker').picker;

                // Adjust offset on show
                datepicker.on('show', function (evt) {
                    elPicker.css('left', parseInt(elPicker.css('left')) + +attrs.offsetX);
                    elPicker.css('top', parseInt(elPicker.css('top')) + +attrs.offsetY);
                });

                // Only watch and format if ng-model is present https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
                if (ngModelController) {
                    // So we can maintain time
                    var lastModelValueMoment;

                    ngModelController.$formatters.push(function (modelValue) {
                        //
                        // Date -> String
                        //

                        // Get view value (String) from model value (Date)
                        var viewValue,
                            m = moment(modelValue);
                        if (modelValue && m.isValid()) {
                            // Valid date obj in model
                            lastModelValueMoment = m.clone(); // Save date (so we can restore time later)
                            viewValue = m.format(momentFormat);
                        } else {
                            // Invalid date obj in model
                            lastModelValueMoment = undefined;
                            viewValue = undefined;
                        }

                        // Update picker
                        element.datepicker('update', viewValue);

                        // Update view
                        return viewValue;
                    });

                    ngModelController.$parsers.push(function (viewValue) {
                        //
                        // String -> Date
                        //

                        // Get model value (Date) from view value (String)
                        var modelValue,
                            m = moment(viewValue, momentFormat, true);
                        if (viewValue && m.isValid()) {
                            // Valid date string in view
                            if (lastModelValueMoment) { // Restore time
                                m.hour(lastModelValueMoment.hour());
                                m.minute(lastModelValueMoment.minute());
                                m.second(lastModelValueMoment.second());
                                m.millisecond(lastModelValueMoment.millisecond());
                            }
                            modelValue = m.toDate();
                        } else {
                            // Invalid date string in view
                            modelValue = undefined;
                        }

                        // Update model
                        return modelValue;
                    });

                    datepicker.on('changeDate', function (evt) {
                        // Only update if it's NOT an <input> (if it's an <input> the datepicker plugin trys to cast the val to a Date)
                        if (evt.target.tagName !== 'INPUT') {
                            ngModelController.$setViewValue(moment(evt.date).format(momentFormat)); // $setViewValue basically calls the $parser above so we need to pass a string date value in
                            ngModelController.$render();
                        }

                        scope.$apply(function(){
                            scope.formattedDate = moment(scope.date).format('DD/MM/YYYY');;
                        });
                    });
                }
            }
        };
    });