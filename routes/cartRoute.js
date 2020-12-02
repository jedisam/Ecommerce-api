const express = require('express');
const { protect } = require('../controllers/authController');
const {
  addToCart,
  getCartItemDetails,
  getCartItems,
  removeFromCart,
  showTotalPrice,
  ShowTotalQunatity,
} = require('../controllers/cartController');
const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
/**
 * @swagger
 * /api/cart:
 *  get:
 *    description: Get all items in the cart
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', getCartItems);
/**
 * @swagger
 * /api/cart/totalPrice:
 *  get:
 *    description: Returns the total price of the Items in the cart
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/totalPrice', showTotalPrice);
/**
 * @swagger
 * /api/cart/totalQuantity:
 *  get:
 *    description: Returns the total Quantity of the Items in the cart
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/totalQuantity', ShowTotalQunatity);

/**
 * @swagger
 * /api/cart/:id:
 *  post:
 *    description: adds items to the cart
 *    responses:
 *      '201':
 *        description: Succsesfully created response
 */

router.post('/:id', addToCart);

/**
 * @swagger
 * /api/cart/:id:
 *  get:
 *    description: returns a specific item from the cart
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "an item to be added to a cart"
 *      required: true
 *      schema:
 *        $ref: "models/product.js#/productSchema"
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.route('/:id').get(getCartItemDetails);

/**
 * @swagger
 * /api/cart/:id:
 *  delete:
 *    description: deletes a specific item from the cart
 *    responses:
 *      '204':
 *        description: No response
 */
router.delete('/:id', removeFromCart);

module.exports = router;
