/**
 * Created by jude on 28/11/2016.
 */
(function(){
module.exports.sixMonthSplir =
    function (queryDate, venueid, callback) {

        var labelsArray=[];
        var dataArray=[];

        var month1 = 0;
        var month2 = 0;
        var month3 = 0;
        var month4 = 0;
        var month5 = 0;
        var month6 = 0;

        var sevenDays = 1000 * 60 * 60 * 24 * 7;

        var calcWeek = function (data) {

            var difference = endDate - data.captime;

            if (difference <= 4*sevenDays)
                month6++;

            if (difference >= 4*sevenDays && difference < 8*sevenDays)
                month5++;

            if (difference >= 8*sevenDays && difference < 12*sevenDays)
                month4++;

            if (difference >= 12*sevenDays && difference < 16*sevenDays)
                month3++;

            if (difference >= 16*sevenDays && difference < 20*sevenDays)
                month2++;

            if (difference >= 20*sevenDays)
                month1++;
        };

        var endDate = Date.parse(queryDate);
        var startDate = endDate - ( 1000 * 60 * 60 * 24 * 28 * 6 );

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
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('venueInfo');

            collection.find({
                venueid: {$eq: venueid},
                captime: {$gte: startDate, $lte: endDate}
            }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result.length);
                    for (var i = 0; i < result.length; i++) {
                        calcWeek(result[i]);
                    }

                    dataArray = [month1, month2, month3, month4, month5, month6];
                    labelsArray = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];

                    callback([labelsArray, dataArray]);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    callback('No document(s) found for selected venue and date.');
                }

            });

        });
 };
})();



