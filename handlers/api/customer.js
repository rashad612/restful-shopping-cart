var express = require('express'),
    app = express(),
    router = express.Router(),
    Customer = require('../../models/customer'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router

    .post('/', function (req, res) {
        var username = req.body.username,
            password = req.body.password,
            customer = new Customer({username: username, password: password});

        customer.save(function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(201).send(result);
        });
    })

    .post('/token', function (req, res) {
        Customer.findOne({username: req.body.username}, function (err, customer) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!customer) {
                return res.sendStatus(401);
            }
            customer.comparePassword(req.body.password, function (err, match) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!match) {
                    return res.sendStatus(401);
                }
                var token = jwt.sign({id: customer._id}, 'token secret stuff', {expiresIn: 60 * 60 * 24});

                res.status(200).send({
                    token: token,
                    expiresIn: 60 * 24
                });
            });
        })
    });
app.use(router);
module.exports = app;
