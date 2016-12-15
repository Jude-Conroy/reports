angular.module('app').config(function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
            alert("There has been an error. Please close browser and start again.");
        };
    }]);
});