var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    quantity: {type: Number, min: 0,required: true},
    description: {type: String}
});

module.exports = mongoose.model('ProductSchema', ProductSchema);