var express = require('express'),
    app = express(),
    router = express.Router(),
    Cart = require('../../models/cart'),
    bodyParser = require('body-parser'),
    dbErrors = require('../../modules/db').Errors;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router
    .get('/:customerId', function (req, res) {
        Cart.find({customerId: req.params.userId})
            .then(function (items) {
                return res.status(200).send(items);
            })
            .catch(function (err) {
                return res.status(500).send(err);
            });
    })

    .post('/:customerId', function (req, res) {
        var cart = new Cart({
            customerId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity
        });

        cart.validate()
            .then(function (result) {
                return cart.save();
            })
            .then(function (result) {
                res.status(201).send(result);
            })
            .catch(dbErrors.ValidationError, function (err) {
                return res.status(422).send(err);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    })

    .delete('/:customerId/:productId', function (req, res) {
        Cart.remove({customerId: req.params.userId, productId: req.params.productId})
            .then(function (item) {
                if (!item) {
                    return res.sendStatus(404);
                }
                return res.sendStatus(204);
            })
            .catch(function (err) {
                return res.sendStatus(500);
            });
    });

app.use(router);
module.exports = app;
