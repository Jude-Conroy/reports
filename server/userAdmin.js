/**
 * Created by jude on 28/11/2016.
 */
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var test = require('assert');

module.exports.addUser =
    function (userName, userEmail, userVenueId, callback) {

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
            var collection = db.collection('users');

            collection.insert({
                name: userName,
                email: userEmail,
                venues:[{venueid:userVenueId}]
            }).then(function(r) {
                // Finish up test
                db.close();

                return callback(test.equal(1, r.insertedCount));
            });
        });
 };



