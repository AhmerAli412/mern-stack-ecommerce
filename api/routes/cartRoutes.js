// // routes/cartRoutes.js
// const express = require('express');
// const router = express.Router();
// const cartController = require('../controllers/cartController');

// router.post('/add-to-cart', cartController.addToCart);
// router.get('/find/:userId', cartController.getCartByUserId);

// module.exports = router;


// cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('./verifyToken');

// Apply verifyToken middleware before the addToCart route
router.post('/add-to-cart', verifyToken, cartController.addToCart);
router.get('/find/:userId', verifyToken, cartController.getCartByUserId);
router.post('/make-payment/:userId', verifyToken, cartController.makePayment);
router.delete('/remove/:productId', verifyToken, cartController.removeItemFromCart);


module.exports = router;

