const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	product:Object,
	cartId:String,
	qty:Number,
	size:Number
});

module.exports = mongoose.model('Item', itemSchema);