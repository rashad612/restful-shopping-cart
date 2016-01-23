var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/', require('./handlers/api'));
app.listen(3000, function () {
    console.log('app started at localhost:3000')
});