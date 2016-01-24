var express = require('express'),
    app = express(),
    router = express.Router(),
    Cart = require('../../models/cart'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router
    .get('/:userId', function (req, res) {
        Cart.find({userId: req.params.userId}, function (err, items) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(items);
        });
    })

    .post('/', function (req, res) {
        var cart = new Cart({
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity
        });

        cart.save(function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(201).send(result);
        });
    })

    .delete('/:productId', function (req, res) {
        Cart.remove({userId: req.params.userId, productId: req.params.productId}, function (err, item) {
            if (err) {
                return res.sendStatus(500);
            }
            if (!item) {
                return res.sendStatus(404);
            }
            return res.sendStatus(204);
        });
    });

app.use(router);
module.exports = app;
