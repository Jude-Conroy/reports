/**
 * Created by jude on 28/11/2016.
 */
(function(){
module.exports.monthSplit =
    function (queryDate, venueId, callback) {

    var labelsArray=[];
    var dataArray=[];

        var week1 = 0;
        var week2 = 0;
        var week3 = 0;
        var week4 = 0;

        var sevenDays = 1000 * 60 * 60 * 24 * 7;

        var calcWeek = function (data) {

            var difference = Date.parse(queryDate) - data.captime;

            if(difference <= sevenDays )
                week4++;

            if (difference <= 2*sevenDays && difference > sevenDays)
                week3++;

            if (difference <= 3*sevenDays && difference > 2 * sevenDays)
                week2++;

            if (difference > 3 * sevenDays)
                week1++;
        };

        var endDate = Date.parse(queryDate);
        var startDate = endDate - ( 4 * sevenDays );

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
                venueid: {$eq: venueId},
                captime: {$gte: startDate, $lte: endDate}
            }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result.length);
                    for (var i = 0; i < result.length; i++) {
                        calcWeek(result[i]);
                    }

                    dataArray = [week1, week2, week3, week4];
                    labelsArray = ["Week 1", "Week 2", "Week 3", "Week 4"];

                    callback([labelsArray, dataArray]);
                } else {
                    console.log('No document(s) found!');
                    callback('No document(s) found for selected venue and date.');
                }

            });
        });
};
})();

