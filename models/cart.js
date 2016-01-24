var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var schema = Schema({
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
    productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true}
});
var Cart = mongoose.model('Cart', schema);

module.exports = Cart;