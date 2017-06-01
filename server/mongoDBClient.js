/**
 * Created by jude on 28/11/2016.
 */
(function(){
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/piData');

    var db = mongoose.connection;

    // data structure
    var venueSchema = mongoose.Schema(
        {
            _id: String,
            distance : String,
            mac_short : String,
            mac : String,
            venueid : String,
            samples : Number,
            captime : Number
        }
    );

    mongoose.model('venueInfo', venueSchema, 'venueInfo');

    db.on('error', console.error.bind(console, 'connection error.....'));
    db.once('open', function callback(){
        console.log('Pi database is now open!')
    });

    module.exports = {
        mongoose: function () {
            return mongoose;
        }
    };
})();

