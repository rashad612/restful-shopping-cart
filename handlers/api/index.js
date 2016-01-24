var express = require('express'),
    app = express(),
    router = express.Router();

router
    .use('/cart/', require('../../middleware/jwtguard'))
    .use('/cart/:customerId', function (req, res, next) {
        if (req.params.customerId !== res.locals.customerId) {
            return res.sendStatus(401);
        }
        next();
    })
    .use('/cart/', require('./cart'))
    .use('/customer/', require('./customer'))
    .use('/product/', require('./product'));


app.use(router);
module.exports = app;
