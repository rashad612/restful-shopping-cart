var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');
var app = require('../../../handlers/api/product');
var dbConfig = require('../../../config/db');

describe('product handler', function() {
    before(function(done) {
        mongoose.connect(dbConfig.TEST_CONNECTION_STRING, function () {
            mongoose.connection.db.dropDatabase(function () {
                done();
            });
        });
    });

    describe('GET /', function() {
        it('should return a list of products', function(done) {
            request(app)
                .get('/')
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

    after(function (done) {
        mongoose.connection.close(done);
    });
});