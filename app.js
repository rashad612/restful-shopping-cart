var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    dbConfig = require('./config/db'),
    db = require('./modules/db');

db.connect(dbConfig);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/', require('./handlers/api'));

app.listen(process.env.PORT || 3000, function () {
    console.log('app started at localhost');
});
