var db = require('../modules/db').get();
var Schema = db.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    quantity: {type: Number, min: 0,required: true},
    description: {type: String}
});

module.exports = db.model('ProductSchema', ProductSchema);