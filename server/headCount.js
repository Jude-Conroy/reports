/**
 * Created by jude on 28/11/2016.
 */
(function(){
    module.exports.count =
        function (queryDate, venueid, callback) {


            var dataArray=[];

            var startDate = Date.parse(queryDate);
            var endDate = startDate + 999 * 60 * 60 * 24;

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

                            var getHour = new Date(result[i].captime);

                            if (dataArray[getHour.getHours()] == undefined){
                                dataArray[getHour.getHours()] = 1;
                            }else {
                                dataArray[getHour.getHours()] = dataArray[getHour.getHours()] + 1;
                            }
                        }

                        dataArray = [dataArray[0], dataArray[1], dataArray[2], dataArray[3], dataArray[4],
                            dataArray[5], dataArray[6], dataArray[7], dataArray[8], dataArray[9],
                            dataArray[10], dataArray[11], dataArray[12], dataArray[13], dataArray[14],
                            dataArray[15], dataArray[16], dataArray[17], dataArray[18], dataArray[19],
                            dataArray[20], dataArray[21], dataArray[22], dataArray[23] ];

                        var labelsArray = ['01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23','24'];
                        var series = ['Series A', 'Series B'];

                        callback([labelsArray, series, dataArray]);
                    } else {
                        console.log('No document(s) found with defined "find" criteria!');
                        callback('No document(s) found with defined "find" criteria!');
                    }

                });
            });
        };
}
)();


