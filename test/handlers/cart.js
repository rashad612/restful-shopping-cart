var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');
var app = require('../../handlers/api/cart');
var Customer = require('../../models/customer');
var Product = require('../../models/product');
var dbConfig = require('../../config/db');
var testProduct, testCustomer;

describe('cart handler', function() {
    before(function(done) {
        mongoose.connect(dbConfig.TEST_CONNECTION_STRING, function () {
            mongoose.connection.db.dropDatabase(function () {
                done();
            });
        });
    });

    before(function (done) {
        testCustomer = new Customer({username: 'test123', password: 'testpass'});
        testCustomer.save(function (err, customer) {
            testCustomer = customer;
            done();
        })
    });

    before(function (done) {
        testProduct = new Product({name: "test product", quantity: 12});
        testProduct.save(function (err, product) {
            testProduct = product;
            done();
        });
    });

    describe('POST / add to cart', function() {
        it('should add a new product to cart', function(done) {
            var item = {
                productId: testProduct._id,
                userId: testCustomer._id,
                quantity: 3
            };
            request(app)
                .post('/')
                .send(item)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(201);
                    done();
                });
        });
    });

    describe('GET /:userId get cart content', function() {
        it('should return list of items in the cart', function(done) {
            request(app)
                .get('/' + testCustomer._id)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(200);
                    assert.equal(Array.isArray(res.body), true);
                    done();
                });
        });
    });

    describe('DELETE /:productId', function (done) {
        it('should remove product from cart and respond with 204', function (done) {
            request(app)
                .delete('/' + testProduct._id)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(204);
                    done();
                });
        });
    });

    after(function (done) {
        mongoose.connection.close(done);
    });
});