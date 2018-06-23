const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
	sku:{type:String,required:true},
	brand:{type:String,required:true},
	model:{type:String, required:true},
	description:{type: String, required: true},
	color:{type:String},
	sizes:String,
	category:{type:String,required:true},
	subCategories:String,
	price:{type:Number, required:true},
	pics:[String]
});

module.exports = mongoose.model('Product', productSchema);