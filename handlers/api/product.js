var express = require('express'),
    app = express(),
    router = express.Router(),
    Product = require('../../models/product');

router.get('/', function (req, res) {
    Product.find(function (err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
});

app.use(router);

module.exports = app;
