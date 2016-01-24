var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    dbConfig = require('./config/db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(dbConfig.CONNECTION_STRING)

app.use('/api/', require('./handlers/api'));
app.listen(3000, function () {
    console.log('app started at localhost:3000')
});