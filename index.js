const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const config = require('./config/database');
const cors = require('cors'); //Cross Access control

//Import routes.
const home = require('./routes/index');
const products = require('./routes/products');
const cart = require('./routes/cart');
const checkout = require('./routes/checkout');
const authentication = require('./routes/authentication');
const miscellaneous = require('./routes/miscellaneous');


//Configures production port if it exists.
const port = process.env.PORT || 8080;
//Configure connection to DB;
mongoose.connect(config.uri,{
	useMongoClient : true 
}, (err) => {
	if(err){
		console.log('Could NOT connect to db');
	}else{
		console.log('Connected to ' + config.db);
	}
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.use(cors({origin:'http://localhost:8080'}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Setup Routes;
app.use('/', home);
app.use('/products', products);
app.use('/authentication', authentication);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/miscellaneous', miscellaneous)


app.listen(port, () => {
	console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode.');
});

