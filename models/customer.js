var db = require('../modules/db').get();
var Schema = db.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = require('../config/crypt').SALT_WORK_FACTOR;
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwt');

var CustomerSchema = new Schema({
    username: {
        type: String, required: true,
        index: { unique: true },
        validate: function(val) {
            return /^[a-zA-Z0-9_]{1,15}$/.test(val);
        }
    },
    password: { type: String, required: true }
});

CustomerSchema.pre('save', function(next) {
    var customer = this;

    if (!customer.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(customer.password, salt, function(err, hash) {
            if (err) return next(err);

            customer.password = hash;
            next();
        });
    });
});

CustomerSchema.methods.comparePassword = Promise.promisify(function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
});

CustomerSchema.methods.getToken = function () {
    var token = jwt.sign({id: this._id}, jwtConfig.TOKEN_SALT, {expiresIn: jwtConfig.EXPIRES_IN});

    return {
        token: token,
        expiresIn: jwtConfig.EXPIRES_IN
    };
};

module.exports = db.model('Customer', CustomerSchema);