const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema ({
	name:{type:String,requred:true}
});

module.exports = mongoose.model('subCategory', subCategorySchema);