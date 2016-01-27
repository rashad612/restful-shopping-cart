var express = require('express'),
    app = express(),
    router = express.Router(),
    Customer = require('../../models/customer'),
    bodyParser = require('body-parser'),
    dbErrors = require('../../modules/db').Errors;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router

    .post('/', function (req, res) {
        var username = req.body.username,
            password = req.body.password,
            customer = new Customer({username: username, password: password});

        customer.validate()
            .then(function (result) {
                return customer.save();
            })
            .then(function (result) {
                return res.sendStatus(201);
            })
            .catch(dbErrors.ValidationError, function (err) {
                return res.status(422).send(err);
            })
            .catch(function (err) {
                return res.status(500).send(err);
            });
    })

    .post('/token', function (req, res) {
        var currentCustomer;

        Customer.findOne({username: req.body.username})
            .then(function (customer) {
                if (!customer) {
                    return res.sendStatus(401);
                }
                return Promise.resolve(customer);
            })
            .then(function (customer) {
                currentCustomer = customer;
                return customer.comparePassword(req.body.password);
            })
            .then(function (match) {
                if (!match) {
                    return res.sendStatus(401);
                }
                var token = currentCustomer.getToken();

                res.status(200).send(token);
            })
            .catch(dbErrors.ValidationError, function (err) {
                return res.status(422).send(err);
            })
            .catch(function (err) {
                return res.status(500).send(err);
            });
    });

app.use(router);
module.exports = app;
