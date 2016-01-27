var express = require('express'),
    app = express(),
    router = express.Router(),
    Product = require('../../models/product');

router.get('/', function (req, res) {
    Product.find()
        .then(function (result) {
            return res.status(200).send(result);
        })
        .catch(function (err) {
            return res.status(500).send(err);
        });
});

app.use(router);

module.exports = app;
