const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subCategory = require('./subCategory')

const categorySchema = new Schema ({
	name:{type:String,requred:true},
	subCategories:[{type:Schema.Types.ObjectId, ref:'subCategory'}]
});

module.exports = mongoose.model('Category', categorySchema);