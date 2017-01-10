/**
 * Created by Jude on 29/12/2016.
 */

var venueId = "";

angular.module('app').service('VenueService', function () {

        this.setVenueId = function (venue) {
            venueId = venue;
        };

        this.getVenueId = function () {
            return venueId;
        };
});

