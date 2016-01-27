var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


module.exports = {
    connect: function (dbConfig) {
        return mongoose.createConnection(dbConfig.CONNECTION_STRING);
    },
    get: function () {
        return mongoose;
    },
    disconnect: function () {
        return mongoose.connection.close();
    },
    Errors: mongoose.Error
}