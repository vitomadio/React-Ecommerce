const express = require('express');
const router = express.Router();

const multer = require('multer');//MIDDLEWARE FOR UPLOAD FILES.
const upload = multer({dest: 'public/uploads/'}).single('file');//CONFIGURE MULTER.
const fs = require('fs');

const Product = require('../models/product');


	//GET ALL PRODUCTS FROM COLLECTION.
	router.get('/', (req,res) => {
		Product.find({}, (err, products) => {
			if(err){
				res.json({success:false, message:err});
			}else{
				if(!products){
					res.json({success:false, message:"There's no products to find."});
				}else{
					res.json({success:true, message:"Success", products:products});
				}
			}
		});
	});

	router.get('/:id', (req,res) => {		
		Product.findById(req.params.id, (err, product) => {
			if(err){
				res.json({success:false, message:err});
			}else{
				res.json({success:true, product:product});
			}
		});
	});

	//UPLOAD PRODUCT IMAGES
	router.post('/upload', function (req, res) {   
		upload(req, res, function (err) {
			if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
       const file = req.file
       
       res.json({success:true, message: "Upload Completed for ", url:file}); 
     });     
	});

	//REMOVE PRODUCT PICTURE FROM SELECTION.
	router.post('/delete-file', (req,res) => {
		const url = req.body.url.slice(9)
		const idx = req.body.idx
		console.log(url)
		fs.unlink( 'public/uploads/'+url, (err, response) => {
			if(err){
				res.json({success:false, message:'Something happened.' + err});
			}else{
				res.json({success:true, message:'Picture has been removed.',idx:idx});
			}
		});
	});

	//ADD A NEW PRODUCT.
	router.post('/add-product', (req,res) => {
		const newProduct = new Product({
			sku:req.body.sku,
			brand:req.body.brand,
			model:req.body.model,
			color:req.body.color,
			description: req.body.description,
			category:req.body.category,
			subCategory: req.body.subCategory, 
			size:req.body.sizes,
			price:req.body.price,
			qty: req.body.qty,
			pics:req.body.pics
		});
		newProduct.save((err, product) => {
			if(err){
				res.json({success:false, message:err});
			}else{
				res.json({success:true, message:"Product saved", product:product});
			}
		});
	});


module.exports = router;