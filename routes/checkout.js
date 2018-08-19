const express = require('express');
const router = express.Router();

// MODELS TO IMPORT
const Order = require('../models/order');
const Invoice = require('../models/invoice');


// CHECKOUT WITH PAYPAL REST SDK FOR TDC
const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'YOUR CLIENT ID',
  'client_secret': 'YOUR CLIENT SECRET'
});



/*=========== CHECKOUT WITH PAYPAL REST SDK FOR TDC ==================*/

router.post('/checkout-tdc', (req,res) => {
	var card_data = {
	  "type": req.body.type,
	  "number": req.body.ccnumber,
	  "expire_month": req.body.month,
	  "expire_year": req.body.year,
	  "cvv2": req.body.cvv,
	  "first_name": req.body.name,
	  "last_name": req.body.lastName
		};
		 
	var create_payment_json = {
	    "intent": "sale",
	    "payer": {
	        "payment_method": "credit_card",
	        "funding_instruments": [{
	            "credit_card": card_data 
	            
	        }]
	    },
	    "transactions": [{
	        "amount": {
	            "total": req.body.totalAmt,
	            "currency": "EUR",
	            // "details": {
	            //     "subtotal": "5",
	            //     "tax": "1",
	            //     "shipping": "1"
	            // }
	        },
	        "description": "This is the payment transaction description."
	    }]
	};

	paypal.payment.create(create_payment_json, function (error, payment) {
	    if (error) {
	        res.json({success:false, message:error})
	    } else {
	        res.json({success:true , message:"payment successfull", payment:payment})   
	    }
	});
	
});

router.get('/invoice-tdc/:id', (req,res) => {
	var paymentId = req.params.id;
	paypal.payment.get(paymentId, function (error, payment) {
	    if (error) {
	        res.json({success: false, message: err});
	        throw error;
	    } else {
	       	res.json({success:true, payment:payment});  
	    }
	});
});

//==================PAYMENT WITH PAYPAL======================================>

router.get('/success', function(req, res) {
    var paymentId = req.query.paymentId;
    var payerId = { 'payer_id': req.query.PayerID };

    paypal.payment.execute(paymentId, payerId, function(error, payment){
        if(error){
            console.error(error);
        } else {
            if (payment.state === 'approved'){ 
            	let url = 'http://localhost:4200?message=Transaction%approved&state='+ payment.state;
                res.redirect(url);
                console.log(payment);
            } else {
                res.redirect('http://localhost:4200/checkout?message=Transaction%failed.');
            }
        }
    });
});

router.post('/checkout', (req,res) => {

	var create_payment_json = {
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
			"return_url": "http://localhost:8080/checkout/success",
			"cancel_url": "http://localhost:4200/checkout"
		},
		"transactions": [{
			"order":req.body.orderId,
			// "item_list": {
			// 	"items": [{
			// 		"name": req.body.orderId,
			// 		"sku": "item",
			// 		"price": req.body.totalAmt,
			// 		"currency": "USD",
			// 		"quantity": req.body.qty
			// 	}]
			// },
			"amount": {
				"currency": "USD",
				"total": req.body.total
			},
			"description": "This is the payment description."
		}]
	};


	paypal.payment.create(create_payment_json, function (err, payment) {
		if (err) {
			console.log(err);
		} else {
			console.log("Create Payment Response");
			console.log(payment);

		  	//you forgot to redirect your response to paypal sandbox
	        var redirectUrl;
	        for(var i=0; i < payment.links.length; i++) {
	            var link = payment.links[i];
	            if (link.method === 'REDIRECT') {
	                redirectUrl = link.href;
	            }
	        }
	        res.json({url:redirectUrl});
		}
	});

});

module.exports = router;
