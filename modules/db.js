var mongoose = require('mongoose');
var dbConfig = require('../config/db');

mongoose.Promise = require('bluebird');


module.exports = {
    connect: function () {
        return mongoose.createConnection(dbConfig.CONNECTION_STRING);
    },
    get: function () {
        return mongoose;
    },
    disconnect: function () {
        return mongoose.connection.close();
    }
}