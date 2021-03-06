var db = require('../modules/db').get();
var Schema = db.Schema;

var cartSchema = Schema({
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
    productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true}
});

cartSchema.index({customerId: true, productId: true}, {unique: true});

var Cart = db.model('Cart', cartSchema);
module.exports = Cart;