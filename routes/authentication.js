const express = require('express');
const router = express.Router();

const config = require('../config/database'); //THIS IS NEEDED TO CONFIGURE A SESSION TOKEN.
const crypto = require('crypto').randomBytes(256).toString('hex');//FOR TOKEN ENCRYPTATION.
const jwt = require('jsonwebtoken'); //THIS IS USED TO TOKEN GENERATION.
const nodemailer = require('nodemailer');

const User = require('../models/user'); //IMPORTING USER MODEL.




	// ================= REGISTRATION ===============================

	router.post('/signup', (req,res) => {
		if(!req.body){
			res.json({success:false, message:'Email or password must be provided'});
		}else{
			User.findOne({email: req.body.email}, (err, user) => {
				if(err){
					res.json({success:false, message: err});
				}else{
					if(user){
						res.json({success:false, message:'Email provided already exists'});
					}else{
						const token = jwt.sign({data: 'token'},crypto,{expiresIn: 60 * 60 });
						const user = new User({
							email: req.body.email,
							password: req.body.password,
							verificationToken: token
						});
						user.save((err, user) => {
							if(err){
								res.json({success:false, message:err});
							}else{
								var smtpTransport = nodemailer.createTransport({
									service: 'Gmail',
									auth: {
										user: '<YOUR EMAIL>',
										pass: '<YOUR PASSWORD>'
									}
								});
								var mailOptions = {
									to: req.body.email,
									from: 'Accountverification@demo.com',
									subject: 'Account verification',
									text: 'Hello,\n\n' +
									'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
									'http://' + req.headers.host + '/authentication/verify/'+token+ ' \n\n' +
									'If you did not request this, please ignore this email and your password will remain unchanged.\n'
								};
								smtpTransport.sendMail(mailOptions, function() {
									res.json({success:true, message:'An e-mail has been sent to ' + user.email + ' with further instructions.'});

								});
							}
						})
					}
				}
			});
		}
	});

	/*======================ACOOUNT VERIFICATION ============================*/

	router.get('/verify/:token', (req,res) => {
		User.findOne({verificationToken: req.params.token}, (err, user) => {
			if(err){
				res.json({success:false, message:err});
			}else{
				user.update({verificationToken: null, active: true}, (err, updateUser) => {
					if(err){
						res.json({success:false, message:err});
					}else{
						res.redirect('http://localhost:8080');
					}
				});
			}
		});
	});


	/*========================LOGIN=============================*/

	router.post('/login', (req,res) => {
		if(!req.body){
			res.json({success:false, message:'Email or password must be provided'});
		}else{
			User.findOne({email: req.body.email}, (err, user) => {
				if(err){
					res.json({success:false, message: err});
				}else{
					if(!user){
						res.json({success:false, message:'Please check your credentials and try again.'});
					}else{
						const validPassword = user.comparePassword(req.body.password);
						if(!validPassword){
							res.json({success:false, message:'Wrong password, please try again.'})
						}else{
						  const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
							res.json({
								success: true,
								message: 'Success!',
								user: user,
                token: token
							});
						}
					}
				}
			});
		}
	});


  /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
  router.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
  });

  /* ===============================================================
     Route to get user's profile data
     =============================================================== */
     router.get('/profile', (req, res) => {
    // Search for user in database
      User.findOne({ _id: req.decoded.userId }, (err, user) => {
        // Check if error connecting
        if (err) {
          res.json({ success: false, message: err }); // Return error
        } else {
          // Check if user was found in database
          if (!user) {
            res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
          } else {
            res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
          }
        }
      });
    });

  /* ===============================================================
     Route to Update User 
     =============================================================== */   

    router.put('/edit-profile', (req,res) => {
     	if(!req.body){
     		res.json({success:false, message:'No data provided for update'})
     	}else{
     		User.findOne({_id:req.decoded.userId}, (err, user) => {
     			if(user.email != req.body.email){
     				const token = jwt.sign({data:'token'},crypto,{ expiresIn: 60 * 60});
     				const userProfile = {
     					name: req.body.name,
     					lastName: req.body.lastName,
     					email: req.body.email,
              telephone: req.body.telephone,
     					address: req.body.address
     				};
     				user.update(userProfile,(err, user) => {
     					if(err){
     						res.json({success:false, message: err});
     					}else{
     						var smtpTransport = nodemailer.createTransport({
     							service: 'Gmail',
     							auth: {
     								user: '<YOUR EMAIL>',
     								pass: '<YOUR PASSWORD>'
     							}
     						});
     						var mailOptions = {
     							to: req.body.email,
     							from: 'Accountverification@demo.com',
     							subject: 'Account verification',
     							text: 'Hello,\n\n' +
     							'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
     							'http://' + req.headers.host + '/authentication/verify/'+token+ ' \n\n' +
     							'If you did not request this, please ignore this email and your password will remain unchanged.\n'
     						};
     						smtpTransport.sendMail(mailOptions, function() {
     							res.json({success:true, message:'An e-mail has been sent to ' + user.email + ' with further instructions.'});

     						});
     					}
     				});
     			}else{
     				const userProfile = {
     					name: req.body.name,
     					lastName: req.body.lastName,
     					email: req.body.email,
              telephoneNum: req.body.telephoneNum,
     					address: req.body.address
     				};
     				user.update(userProfile,(err, user) => {
     					if(err){
     						res.json({success:false, message: err});
     					}else{
     						res.json({success:true, message:'Your profile has been updated.', user:user})
     					}
     				});
     			}
     		});	
     	}


    });

module.exports = router;
