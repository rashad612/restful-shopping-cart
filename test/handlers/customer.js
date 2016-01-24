var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');
var app = require('../../handlers/api/');

describe('customer handler', function() {
    before(function(done) {
        mongoose.connect('mongodb://localhost/cart');
        done();
    });

    describe('POST /', function() {
        it('should register a new customer', function(done) {
            var customer = {
                username: 'test_username',
                password: '123'
            };
            request(app)
                .post('/api/customer/')
                .send(customer)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(201);
                    done();
                });
        });
    });

    describe('POST /token', function() {
        it('should return an authentication token', function(done) {
            var customer = {
                username: 'test_username',
                password: '123'
            };
            request(app)
                .post('/api/customer/token')
                .send(customer)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(200);
                    res.body.should.have.property("token");
                    done();
                });
        });
    });

    after(function (done) {
        mongoose.connection.close(done);
    });
});