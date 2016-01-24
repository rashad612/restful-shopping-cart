var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');
var app = require('../../handlers/api/');

describe('cart handler', function() {
    before(function(done) {
        mongoose.connect('mongodb://localhost/cart');
        done();
    });

    describe('POST / add to cart', function() {
        it('should return error trying to save duplicate username', function(done) {
            var item = {
                productId: '123',
                userId: '123',
                quantity: 3
            };
            request(app)
                .post('/api/cart/')
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

    describe('GET / get cart content', function() {
        it('should return list of items in the cart', function(done) {
            request(app)
                .get('/api/cart/')
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(200);
                    assert.equal(Array.isArray(res), true);
                    done();
                });
        });
    });

    describe('DELETE /{productId}', function (done) {
        it('should remove product from cart and respond with 204', function (done) {
            request(app)
                .delete('/api/cart/123')
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(204);
                    done();
                });
        });
    });
});