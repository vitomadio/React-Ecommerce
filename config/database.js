const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  uri: 'mongodb://localhost:27017/eshop2', // Databse URI and database name for dev mode
  // uri: 'mongodb://vitomadio:vitomadio@ds245805.mlab.com:45805/eshop-mean', //Prod Mode end point
  secret: crypto, // Cryto-created secret
  db: 'eshop2' // Database name
}