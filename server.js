const express = require('express');
const app = express();
const path = require('path');
const customerVisits = require('./server/customerVisits.js');
const visitOneWeek = require('./server/visitOneWeek.js');
const visitFourWeeks = require('./server/visitFourWeeks.js');
const visitSixMonths = require('./server/visitSixMonths.js');
const headcount = require('./server/headCount.js');
const user = require("./server/userAdmin")
const port = 3000;

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/Content')));
app.use(express.static(path.join(__dirname + '/ext-modules')));
app.use(express.static(path.join(__dirname + '/app')));
app.use(express.static(path.join(__dirname + '/node_modules')));
app.use(express.static(path.join(__dirname + '/fonts')));
app.use(express.static(path.join(__dirname + '/images')));
app.use(express.static(path.join(__dirname + '/server')));
app.use(express.static(path.join(__dirname + '/')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/customerVisitsReport', function(request, response) {
    customerVisits.pieDuration(request.query.queryDate, request.query.venueid, function(data){
        response.send(data);
    });
});

app.get('/serviceDayReport', function(request, response) {

    if(request.query.reportType === "7 Days") {
        visitOneWeek.weekReport(request.query.queryDateRange, request.query.venueid, function(data){
            response.send(data);
        });
    }

    if(request.query.reportType === "4 Weeks") {
        visitFourWeeks.monthSplit(request.query.queryDateRange, request.query.venueid, function(data){
            response.send(data);
        });
    }

    if(request.query.reportType === "6 Months") {
        visitSixMonths.sixMonthSplir(request.query.queryDateRange, request.query.venueid, function(data){
            response.send(data);
        });
    }
});

app.get('/headCountReport', function(request, response) {
    headcount.count(request.query.queryDate, request.query.venueid, function(data){
        response.send(data);
    });
});-

app.get('/addUser', function(request, response) {
    user.addUser(request.query.userName, request.query.userEmail, request.query.userVenueId, function(data){
        response.send(data);
    });
});

app.listen(port, function(err) {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is listening on ' + port)
});