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
 *    security:
 *      - bearerAuth: []
 *    summary: Get all items in Cart
 *    description: Gets all Cart Items
 *    responses:
 *      '200':
 *        description: Successful Response
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: Status of the response
 *                    example: "Success"
 *                  results:
 *                    type: number
 *                    description: Number of Items in Cart
 *                    example: 5
 *                  totalPrice:
 *                    type: number
 *                    description: Total Price of Items in Cart
 *                    example: 599
 *                  totalQuantity:
 *                    type: number
 *                    description: Total Quantity of Items in Cart
 *                    example: 12
 *                  data:
 *                    type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            quantity:
 *                              type: number
 *                              description: Quanties of the product added in the cart
 *                              example: 2
 *                            createdAt:
 *                              type: string
 *                              description: Created at date of the product
 *                              example: "2021-01-01T19:18:30.809Z"
 *                            _id:
 *                              type: string
 *                              description: Id of the Cart Item
 *                              example: "5fce8d709828ce518dbf47c9"
 *                            product:
 *                              type: object
 *                              properties:
 *                                _id:
 *                                  type: string
 *                                  description: Id of the product
 *                                  example: "1fce8d709828ce518dbf47s6"
 *                                name:
 *                                  type: string
 *                                  description: Name of the product
 *                                  example: "Iphone 6"
 *                                price:
 *                                  type: number
 *                                  description: Price of the product
 *                                  example: 299
 *                                description:
 *                                  type: string
 *                                  description: Description of the product
 *                                  example: "Smart phone made by Apple"
 *                                slug:
 *                                  type: string
 *                                  description: Slug of the product
 *                                  example: "iphone-6"
 *                                vendor:
 *                                  type: string
 *                                  description: Vendor of the product
 *                                  example: "Apple"
 *                                itemType:
 *                                  type: string
 *                                  description: Type of the product
 *                                  example: "Smart Phone"
 *                                productImg:
 *                                  type: string
 *                                  description: Image of the product
 *                                  example: "iphone-6.jpg"
 */
router.get('/', getCartItems);
/**
 * @swagger
 * /api/cart/totalPrice:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Returns the total price of the Items in the cart
 *    summary: Returns the total Price in Cart
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/totalPrice', showTotalPrice);
/**
 * @swagger
 * /api/cart/totalQuantity:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Returns the total Quantity of the Items in the cart
 *    summary: Returns total Quantity in Cart
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
 *    summary: Add Product Item to Cart using the product's ID
 *    security:
 *      - bearerAuth: []
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
 *    summary: Get Cart Item Detail using item's ID
 *    security:
 *      - bearerAuth: []
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
