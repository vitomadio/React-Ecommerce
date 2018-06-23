const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Item = require('../models/item');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');


//Get cart
router.get('/:userId', (req,res) => {
	Cart.findOne({userId:req.params.userId}).populate('items').exec((err, cart) => {
		if(err){
			res.json({success:false,message:err});
		}else{
			res.json({success:true, cart:cart});
		}
	});
});

//Get Items
router.get('/items/:id', (req,res) => {
	Cart.findOne({userId:req.params.id}, (err, cart) => {
		if(err){
			res.json({success:false,message:err});
		}else{
			if(!cart){
				console.log('Cart does not exists.');
			}else{
				Item.find({cartId:cart._id}).populate('product').exec((err,items) => {
					if(err){
						res.json({success:false, message:err});
					}else{
						res.json({success:true, items:items});
					}
				});	
			}				
		}	
	})
});

//Create new Cart or add product to one that exists.
router.post('/add-to-cart/:id', (req,res) => {  // :userId as params use this after auth implementation
	Cart.findOne({userId:req.params.id}, (err,cart) => {
		if(err){
			res.json({success:false,message:err});
		}else{
			Product.findById(req.body.productId,(err,product) => {
				
			if(!cart){
				const item = new Item({
					product:product,
					cartId:null,
					qty:req.body.qty,
					size:req.body.size
				});
				item.save((err,item) => {
					if(err){
						res.json({success:false,message:err});
					}else{
						const cart = new Cart({
							items:[item], 
							userId:req.params.id
						});
						cart.save((err,cart) => {
							if(err){
								res.json({success:false,message:err});
							}else{
								item.cartId = cart._id;
								item.save((err,itemWithCart) => {
									if(err){
										res.json({success:false,message:err});
									}else{
										res.json({success:true,message:"This item was added to your shopping cart."})
									}
								});	
							}
						});
					}
				});
			}else{
				Item.findOne({cartId:cart._id,product:product,size:req.body.size}, (err,item) => {
					if(err){
						res.json({success:false,message:err});
					}else{
						if(!item){
						 	const item = new Item({
						 		product:product,
						 		cartId:cart._id,
						 		qty:req.body.qty,
						 		size:req.body.size
						 	});
						 	item.save((err,item) => {
						 		if(err){
						 			res.json({success:false,message:err});
						 		}else{
						 			cart.items.unshift(item);
						 			cart.save((err) =>{
						 				if(err){
						 					res.json({success:false,message:err});
						 				}else{					 					
						 					res.json({success:true,message:"This item was added to your shopping cart."});
						 				}
						 			});
						 		}
						 	});
						}else{
							item.update({qty:item.qty + req.body.qty},(err, itemUpdated) => {
								if(err){
									res.json({success:false,message:err});
								}else{
									res.json({success:true,message:"One more item was aded to your shopping cart."});
								}
							});
						}
					}
				});
			}
		 });
		}
	});
});

router.get('/add-one-item/:id', (req,res) => {
	Item.findById(req.params.id, (err, item) => {
		if(err){
			res.json({success:false, message:err});
		}else{
			item.update({qty:item.qty + 1}, (err, itemUpdated) => {
				if(err){
					res.json({success:false, message:err});
				}else{
					res.json({success:true, message:"One item added", item:itemUpdated})
				}
			});
		}
	})
});

router.get('/substract-one-item/:id', (req,res) => {
	Item.findById(req.params.id, (err, item) => {
		if(err){
			res.json({success:false, message:err});
		}else{
			if(item.qty == 1){
				item.remove();
			}else{
				item.update({qty:item.qty - 1}, (err, itemUpdated) => {
					if(err){
						res.json({success:false, message:err});
					}else{
						res.json({success:true, message:"One item removed", item:itemUpdated})
					}
				});
			}
		}
	})
});

//Remove Item from cart
router.delete('/remove-item/:id', (req,res) => {
	const cartId = req.body.cartId
	const idx = req.body.idx
	Item.findById(req.params.id, (err, item) => {
		if(err){
			res.json({success:false, message:err});
		}else{
			item.remove((err) => {
				if(err){
					res.json({success:false, message:err});
				}else{
					console.log(JSON.stringify(item))
					Cart.findByIdAndUpdate(cartId,{"$pull":{"items":item._id}}, (err, cart) => {
						if(err){
							res.json({success:false, message:err});
						}else{
							if(cart.items.length >= 1){
								res.json({success:true, message:'Item has been removed from shopping cart.'});
							}else{
								cart.remove((err) => {
									if(err){
										res.json({success: false, message: err})
									}
									else{
										res.json({success: true,})
									}
								})
							}
						}
					})
				}
			});
		}
	})
});

router.post('/create-order/:id', (req,res) => {
	Cart.findOne({userId:req.params.id}, (err,cart) => {
		if(err){
			res.json({success:false, message:err});
		}else{
			const order = new Order({
				cart:cart, 
				totalAmt:req.body.totalAmt,
				userId:req.params.id
			});
			order.save((err,order) => {
				if(err){
					res.json({success:false, message:err});
				}else{
					res.json({success:true, message:'Proced to checkout', order:order});
				}
			});
		}
	});
});

router.get('/unlink-from-user/:id', (req,res) => {
	// Cart.findOne({userId:req.params.id}, (err, cart) => {
	// 	let products = [];
	// 	for(var i=0;i<cart.items.length;i++){
	// 		Product.find({_id:cart.items[i].product}, (err, product) => {
	// 			products.push(product);
	// 			if
	// 		};
	// 	}
		
		
	// });
});

router.delete('/remove-order/:id', (req,res) => {
	Order.findo(req.params.id, (err, order) => {
		if(err){
			res.json({success:false, message:err});
		}else{
			order.remove((err) => {
				if(err){
					res.json({success:false, message:err});
				}else{
					res.json({success:true});
				}
			})
		}
	})
});


module.exports = router;