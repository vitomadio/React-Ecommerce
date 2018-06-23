const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
	items:[{type:Schema.Types.ObjectId, ref:'Item'}],
	userId:String
});

module.exports = mongoose.model('Cart', cartSchema);