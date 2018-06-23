const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	cart:{type:Schema.Types.ObjectId, ref:'Cart'},
	totalAmt:Number,
	userId:String
});

module.exports = mongoose.model('Order', orderSchema);