/**
 * Created by jude on 28/11/2016.
 */
(function(){
var getDayText = function(date){

    if (date.getDay() == 0){
        return date.getUTCDate() + " Sunday"}
    if (date.getDay() == 1){
        return date.getUTCDate() + " Monday"}
    if (date.getDay() == 2){
        return date.getUTCDate() + " Tuesday"}
    if (date.getDay() == 3){
        return date.getUTCDate() + " Wednesday"}
    if (date.getDay() == 4){
        return date.getUTCDate() + " Thursday"}
    if (date.getDay() == 5){
        return date.getUTCDate() + " Friday"}
    if (date.getDay() == 6){
        return date.getUTCDate() + " Saturday"}
};

module.exports.weekReport =
    function (queryDate, venueid, callback) {

        var baseDate = Date.parse(queryDate);
        var oneDay = 60*60*24*1000;

        baseDate = baseDate+oneDay;

        var dayOne      = Date.parse(queryDate);
        var dayTwo      = Date.parse(queryDate) - oneDay;
        var dayThree    = Date.parse(queryDate) - 2*oneDay;
        var dayFour     = Date.parse(queryDate) - 3*oneDay;
        var dayFive     = Date.parse(queryDate) - 4*oneDay;
        var daySix      = Date.parse(queryDate) - 5*oneDay;
        var daySeven    = Date.parse(queryDate) - 6*oneDay;

        var labelsArray = [
            getDayText(new Date(daySeven)),
            getDayText(new Date(daySix)),
            getDayText(new Date(dayFive)),
            getDayText(new Date(dayFour)),
            getDayText(new Date(dayThree)),
            getDayText(new Date(dayTwo)),
            getDayText(new Date(dayOne))
        ];

        var datesArray = {};

        for(var name in labelsArray) {
            datesArray[labelsArray[name]] = 0;
        }

        //lets require/import the mongodb native drivers.
        var mongodb = require('mongodb');
        //We need to work with "MongoClient" interface in order to connect to a mongodb server.
        var MongoClient = mongodb.MongoClient;
        // Connection URL. This is where your mongodb server is running.
        var url = 'mongodb://localhost:27017/piData';
        // Use connect method to connect to the Server
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                return;
            }
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('venueInfo');

            collection.find({
                venueid: {$eq: venueid},
                captime: {$gte: daySeven, $lte: baseDate}
            }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result.length);
                    var capTime;
                    for (var j = 0; j < result.length; j++) {
                        capTime = new Date(result[j].captime);
                        var dayName = getDayText(capTime);
                        datesArray[dayName] = datesArray[dayName]+1;
                    }

                    var newArray = [];
                    var keyCount = 0;
                    for(var key in datesArray){
                        newArray[keyCount] = datesArray[key];
                        keyCount++;
                    }
                    callback([labelsArray, newArray]);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    callback('No document(s) found for selected venue and date.');
                }
            });
        });
    };
})();

