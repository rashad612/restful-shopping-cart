var express = require('express'),
    app = express(),
    router = express.Router();

router
    .use('/cart/', require('./cart'))
    .use('/customer/', require('./customer'))
    .use('/product/', require('./product'));


app.use(router);
module.exports = app;
