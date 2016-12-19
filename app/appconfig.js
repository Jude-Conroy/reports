angular.module('app').config(function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);

            $.notify({
                title: '<strong>Report: </strong>',
                message: "There has been an error. Please close browser and start again. " + cause
            },{
                type: 'danger'
            },{animate: {
                enter: 'animated fadeInRight',
                exit: 'animated fadeOutRight'
            }
            });
        };
    }]);
});