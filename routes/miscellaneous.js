const express = require('express');
const router = express.Router();

const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const Size = require('../models/size');

//Category Crud

router.get('/categories', (req,res) =>{
	Category.find({},(err,categories) => {
		if(err){
			res.json({success:false,message:err.message})
		}else{
			if(!categories){
				res.json({success:false, message:'No Categories in the list', payload: null})
			}else {
				res.json({success:true, payload:categories})
			}
		}
	})
})

router.post('/categories', (req,res)=>{
	Category.findOne({name: req.body.name}, (err, category)=>{
		if(err){
			res.json({success:false, message:err.message})
		}else{
			if(!category){
				const newCategory = new Category({
					name: req.body.name
				});
				newCategory.save((err, category)=>{
					if(err){
						res.json({success:false, message:err.message})
					}else{
						res.json({success:true,message:'New category added to the list.', payload:category})
					}
				})
			}else{
				res.json({success:false, message:'Category already exists.'})
			}
		}
	})
})

router.post('/sub-categories', (req,res) => {
	Category.findOne({name:req.body.category}, (err, category)=> {
		if(err){
			res.json({success:false, message:err.message})
		}else{
			if(!category){
				res.json({success:false, message:'Category does not exists, please create one to procede.'})
			}else{
				SubCategory.findOne({name:req.body.name}, (err, subCategory)=> {
					if(err){
						res.json({success:false, message:err.message})
					}else{
						if(!subCategory){
							const newSubCategory = new SubCategory ({
								name: req.body.name,
							});
							newSubCategory.save((err, subCategory)=> {
								if(err){
									res.json({success:false, message:err.message})
								}else{
									category.update({$push:{subCategories:subCategory}})
								}
							})
						}
					}
				})
			}
		}
	})
	
})

module.exports = router;