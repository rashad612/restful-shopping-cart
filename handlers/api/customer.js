var express = require('express'),
    app = express(),
    router = express.Router(),
    Customer = require('../../models/customer'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    jwtConfig = require('../../config/jwt');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router

    .post('/', function (req, res) {
        var username = req.body.username,
            password = req.body.password,
            customer = new Customer({username: username, password: password});

        customer.save()
            .then(function (result) {
                return res.sendStatus(201);
            })
            .catch(function (err) {
                return res.status(500).send(err);
            });
    })

    .post('/token', function (req, res) {
        Customer.findOne({username: req.body.username})
            .then(function (customer) {
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
                    var token = jwt.sign({id: customer._id}, jwtConfig.TOKEN_SALT, {expiresIn: jwtConfig.EXPIRES_IN});

                    res.status(200).send({
                        token: token,
                        expiresIn: jwtConfig.EXPIRES_IN
                    });
                });
            })
            .catch(function (err) {
                return res.status(500).send(err);
            });
    });

app.use(router);
module.exports = app;
